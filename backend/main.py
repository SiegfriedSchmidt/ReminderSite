from pprint import pprint
from typing import Annotated

import peewee
from fastapi import HTTPException, Depends, Request, FastAPI, APIRouter, Header
from fastapi.responses import JSONResponse
from fastapi_jwt_auth import AuthJWT
from fastapi_jwt_auth.exceptions import AuthJWTException
from passlib.context import CryptContext
from starlette.middleware.cors import CORSMiddleware

from lib.gmail_api import GmailApi
from lib.init import secret_folder_path, expirationCodeTime
from lib.logger import *
from lib.models import User, Event, Notification, create_tables, fill_json_data
from lib.pydantic_models import *
import asyncio
import uvicorn

from lib.verification_codes import VerificationCodes

verification_codes = VerificationCodes()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated='auto')
gmail_api = GmailApi(secret_folder_path, setup_gmail_api_logger())
create_tables()

router = APIRouter(prefix='/api')
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


@AuthJWT.load_config
def get_config():
    return SettingsPydantic()


@app.exception_handler(AuthJWTException)
def authjwt_exception_handler(request: Request, exc: AuthJWTException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.message}
    )


@router.get('/')
async def main(request: Request):
    return {'title': 'about'}


@router.post('/auth/refresh')
async def refresh(Authorize: AuthJWT = Depends()):
    Authorize.jwt_refresh_token_required()

    current_username = Authorize.get_jwt_subject()
    if not User.select().where(User.username == current_username).exists():
        raise HTTPException(status_code=400, detail="Такого пользователя не существует!")

    new_access_token = Authorize.create_access_token(subject=current_username)
    return {"access_token": new_access_token}


@router.post('/auth/login')
async def login(request: Request, user: UserPydantic, Authorize: AuthJWT = Depends()):
    selected_user = User.select().where(User.username == user.username)
    if not selected_user.exists() or not verify_password(user.password, (user_auth := selected_user.get()).password):
        raise HTTPException(status_code=400, detail="Bad username or password")

    access_token = Authorize.create_access_token(subject=user.username)
    refresh_token = Authorize.create_refresh_token(subject=user.username)
    notifications = user_auth.notifications.get()
    return {
        "accessToken": access_token,
        "refreshToken": refresh_token,
        "username": user_auth.username,
        "email": user_auth.email,
        "isAdmin": user_auth.isAdmin,
        "notifications": {
            "time": notifications.time,
            "email": notifications.email,
            "emailEnabled": notifications.emailEnabled,
            "telegramEnabled": notifications.telegramEnabled,
            "pushEnabled": notifications.pushEnabled,
        }
    }


@router.post('/auth/register')
async def register(user: UserRegistrationPydantic, Authorize: AuthJWT = Depends()):
    if verification_codes.verify_code(user.code) != user.username:
        raise HTTPException(status_code=400, detail="Неверный код!")

    selected_user = User.select().where(User.username == user.username)
    if selected_user.exists():
        raise HTTPException(status_code=400, detail="Имя пользователя уже занято!")

    user_auth = User.create(username=user.username, email=user.email, password=get_password_hash(user.password),
                            isAdmin=False)
    notifications = Notification.create(time='08:00', email=user_auth.email, emailEnabled=True, telegramId='',
                                        telegramEnabled=False, pushId='', pushEnabled=True, user=user_auth)
    access_token = Authorize.create_access_token(subject=user.username)
    refresh_token = Authorize.create_refresh_token(subject=user.username)
    return {
        "accessToken": access_token,
        "refreshToken": refresh_token,
        "username": user_auth.username,
        "email": user_auth.email,
        "isAdmin": user_auth.isAdmin,
        "notifications": {
            "time": notifications.time,
            "email": notifications.email,
            "emailEnabled": notifications.emailEnabled,
            "telegramEnabled": notifications.telegramEnabled,
            "pushEnabled": notifications.pushEnabled,
        }
    }


@router.post('/getcode')
async def getcode(username_email: UsernameEmailPydantic, Authorize: AuthJWT = Depends()):
    code = verification_codes.add_data_with_code(username_email.username)
    print(code)
    # gmail_api.send_email(username_email.email, 'Код проверки', code)
    return {"expirationTime": expirationCodeTime}


@router.get('/event/getall')
async def event_get_all(Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()

    current_username = Authorize.get_jwt_subject()

    if not User.select().where(User.username == current_username).exists():
        raise HTTPException(status_code=400, detail="Такого пользователя не существует!")

    events = []
    for event in User.select().where(User.username == current_username).get().events:
        events.append(event.__dict__['__data__'])

    return events


@router.post('/event/add')
async def event_add(event: EventPydantic, Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()

    current_username = Authorize.get_jwt_subject()
    current_user = User.select().where(User.username == current_username)

    created_event = Event.create(title=event.title, description=event.description, date=event.date, user=current_user)
    return {"id": created_event.id}


@router.post('/event/update')
async def event_update(event: EventWithIdPydantic, Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()
    current_username = Authorize.get_jwt_subject()

    selected_event = Event.select().join(User).where(Event.id == event.id & User.username == current_username)
    if not selected_event.exists():
        raise HTTPException(status_code=400, detail="Событие отсутствует!")

    selected_event = selected_event.get()
    selected_event.title = event.title
    selected_event.description = event.description
    selected_event.date = event.date
    selected_event.save()
    return "success"


@router.post('/event/delete')
async def event_delete(data: EventIdPydantic, Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()
    current_username = Authorize.get_jwt_subject()

    selected_event = Event.select().join(User).where(Event.id == data.eventId & User.username == current_username)
    if not selected_event.exists():
        raise HTTPException(status_code=400, detail="Событие отсутствует!")

    selected_event.get().delete_instance()
    return "success"


@router.post('/notification/time')
async def notification_time(data: NotificationTimePydantic, Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()

    current_username = Authorize.get_jwt_subject()
    notification = User.select().where(User.username == current_username).get().notifications.get()
    notification.time = data.time
    notification.save()
    return "success"


@router.post('/notification/push')
async def notification_push(data: NotificationPushPydantic, Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()

    current_username = Authorize.get_jwt_subject()
    notification = User.select().where(User.username == current_username).get().notifications.get()
    notification.pushEnabled = data.pushEnabled
    notification.save()
    return "success"


@router.post('/notification/email')
async def notification_email(data: NotificationEmailPydantic, Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()

    current_username = Authorize.get_jwt_subject()
    notification = User.select().where(User.username == current_username).get().notifications.get()
    notification.emailEnabled = data.emailEnabled
    notification.save()
    return "success"


@router.post('/notification/telegram')
async def notification_telegram(data: NotificationTelegramPydantic, Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()

    current_username = Authorize.get_jwt_subject()
    notification = User.select().where(User.username == current_username).get().notifications.get()
    notification.telegramEnabled = data.telegramEnabled
    notification.save()
    return "success"


async def verify_internal_token(token: Annotated[str, Header()]):
    if token == config.jwt_secret_key.get_secret_value():
        return {"verified": True}
    else:
        raise HTTPException(status_code=403, detail="INVALID TOKEN")


@router.get('/internal/get_today_events')
async def get_today_events(commons=Depends(verify_internal_token)):
    events = []
    today = datetime.date.today()
    current_day = f'{today.day:02}'
    current_month = f'{today.month:02}'
    for event in Event.select().where(peewee.fn.strftime('%d', Event.date) == current_day,
                                      peewee.fn.strftime('%m', Event.date) == current_month):
        user = event.user.select().get()
        notifications = user.notifications.get()
        events.append({
            'username': user.username,
            'title': event.title,
            'date': event.date,
            'description': event.description,
            'years': today.year - datetime.datetime.strptime(event.date, '%Y-%m-%d').year,
            'time': notifications.time,
            'pushEnabled': notifications.pushEnabled,
            'emailEnabled': notifications.emailEnabled,
            'telergamEnabled': notifications.telegramEnabled,
            'pushId': notifications.pushId,
            'email': notifications.email,
            'telergamId': notifications.telegramId
        })
    return {'events': events}


@router.post('/internal/send_email_notification')
async def get_today_events(data: InternalEmailSendPydantic, commons=Depends(verify_internal_token)):
    gmail_api.send_email(data.email, data.subject, data.content)
    return {'status': 'success'}


async def main():
    app.include_router(router)
    config = uvicorn.Config(app, host='0.0.0.0', port=8000, log_level="debug", log_config=None)
    server = uvicorn.Server(config)
    setup_peewee_logger()
    setup_uvicorn_logger()
    await server.serve()


if __name__ == '__main__':
    asyncio.run(main())
