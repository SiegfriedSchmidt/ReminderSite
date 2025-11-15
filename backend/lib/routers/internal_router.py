from fastapi import HTTPException, Depends, APIRouter, Header
from typing import Annotated, List
from pydantic import BaseModel
from pywebpush import WebPushException
import peewee
import datetime

from lib.config_reader import config
from lib.gmail_api import GmailApiException
from lib.init import verify_password
from lib.models import User, Event, Subscription, database
from lib.utils.send_push import send_push

router = APIRouter(prefix='/internal')


async def verify_internal_token(token: Annotated[str, Header()]):
    if token == config.internal_token.get_secret_value():
        return {"verified": True}
    else:
        raise HTTPException(status_code=403, detail="INVALID TOKEN")


@router.get('/get_today_events')
async def get_today_events(commons=Depends(verify_internal_token)):
    events = []
    today = datetime.date.today()
    current_day = f'{today.day:02}'
    current_month = f'{today.month:02}'
    for event in Event.select().where(peewee.fn.strftime('%d', Event.date) == current_day,
                                      peewee.fn.strftime('%m', Event.date) == current_month):
        user = event.user.select().get()
        userSettings = user.userSettings.get()
        pushSubscriptions = [sub.pushSubscription for sub in user.subscriptions.select(Subscription.pushSubscription)]
        events.append({
            'username': user.username,
            'title': event.title,
            'date': event.date,
            'description': event.description,
            'years': today.year - datetime.datetime.strptime(event.date, '%Y-%m-%d').year,
            'timeNotification': userSettings.timeNotification,
            'pushEnabled': userSettings.pushEnabled,
            'emailEnabled': userSettings.emailEnabled,
            'telergamEnabled': userSettings.telegramEnabled,
            'emailNotification': userSettings.emailNotification,
            'telergamId': userSettings.telegramId,
            'pushSubscriptions': pushSubscriptions,
        })
    return {'events': events}


class InternalEmailSendPydantic(BaseModel):
    subject: str
    content: str
    email: str


@router.post('/send_email_notification')
async def send_email_notification(data: InternalEmailSendPydantic, commons=Depends(verify_internal_token)):
    try:
        # gmail_api.send_email(data.email, data.subject, data.content)
        return {'status': 'success'}
    except GmailApiException:
        return {'status': 'error'}


class InternalSendPushNotificationPydantic(BaseModel):
    pushSubscriptions: List[str]
    title: str
    body: str


@router.post('/send_push_notifications')
async def send_push_notifications(data: InternalSendPushNotificationPydantic, commons=Depends(verify_internal_token)):
    try:
        send_push(data.pushSubscriptions, data.title, data.body)
        return {'status': 'success'}
    except WebPushException as ex:
        return {'status': 'error'}


class InternalSendPushNotificationByNamePydantic(BaseModel):
    username: str
    title: str
    body: str


@router.post('/send_push_notification_by_name')
async def send_push_notifications_by_name(data: InternalSendPushNotificationByNamePydantic,
                                          commons=Depends(verify_internal_token)):
    try:
        selected_user = User.select().where(User.username == data.username)
        if not selected_user.exists():
            return {'status': 'error'}

        send_push([sub.pushSubscription for sub in selected_user.get().subscriptions], data.title, data.body)
        return {'status': 'success'}
    except WebPushException as ex:
        return {'status': 'error'}


class InternalUserWithTelegramId(BaseModel):
    username: str
    password: str
    telegramId: str


@router.post('/login_with_telegramId')
async def login_with_telegramId(data: InternalUserWithTelegramId, commons=Depends(verify_internal_token)):
    selected_user = User.select().where(User.username == data.username)
    if not selected_user.exists() or not verify_password(data.password, (user_auth := selected_user.get()).password):
        return {'status': 'error'}

    userSettings = user_auth.userSettings.get()
    userSettings.telegramId = data.telegramId
    userSettings.save()
    return {'status': 'success'}


class EventPydantic(BaseModel):
    title: str
    description: str
    date: str


class EventsPydantic(BaseModel):
    events: List[EventPydantic]
    username: str


@router.post('/add_events')
async def add_events(data: EventsPydantic, commons=Depends(verify_internal_token)):
    user = User.select().where(User.username == data.username)
    if not user.exists():
        return {'status': 'error', 'content': 'User does not exist'}

    event_ids = []
    with database.atomic():
        for event in data.events:
            created_event = Event.create(title=event.title, description=event.description, date=event.date, user=user)
            event_ids.append(created_event.id)
    return {'status': 'success', 'content': {"event_ids": event_ids}}
