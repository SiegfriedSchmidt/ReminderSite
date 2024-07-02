from fastapi import HTTPException, Depends, APIRouter, Header
from typing import Annotated, List
from pydantic import BaseModel
from pywebpush import webpush, WebPushException
import peewee
import datetime
import json

from lib.config_reader import config
from lib.gmail_api import GmailApiException
from lib.init import vapid_private_key_path, admin_email, verify_password
from lib.models import User, Event, Subscription

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
        for pushSub in data.pushSubscriptions:
            webpush(
                subscription_info=json.loads(pushSub),
                data=json.dumps({
                    'title': data.title,
                    'body': data.body
                }),
                vapid_private_key=vapid_private_key_path,
                vapid_claims={
                    'sub': f'mailto:{admin_email}'
                }
            )
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
