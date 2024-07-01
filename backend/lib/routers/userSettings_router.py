from fastapi import Depends, APIRouter
from fastapi_another_jwt_auth import AuthJWT
from pydantic import BaseModel

from lib.config_reader import config
from lib.models import User, Subscription

router = APIRouter(prefix='/userSettings')


class UserSettingsPydantic(BaseModel):
    timeNotification: str | None = None
    pushEnabled: bool | None = None
    emailEnabled: bool | None = None
    telegramEnabled: bool | None = None
    pushSubscription: str | None = None


@router.post('/update')
async def update(data: UserSettingsPydantic, Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()

    current_username = Authorize.get_jwt_subject()
    user = User.select().where(User.username == current_username)
    userSettings = user.get().userSettings.get()

    if data.timeNotification is not None:
        userSettings.timeNotification = data.timeNotification
    if data.pushEnabled is not None:
        userSettings.pushEnabled = data.pushEnabled
        if not data.pushEnabled:
            Subscription.delete().where(user == user).execute()
    if data.pushSubscription is not None:
        Subscription.create(pushSubscription=data.pushSubscription, user=user)
    if data.emailEnabled is not None:
        return {'status': 'warning', 'content': 'Уведомления по почте временно недоступны!'}
        # userSettings.emailEnabled = data.emailEnabled
    if data.telegramEnabled is not None:
        return {'status': 'warning', 'content': 'Уведомления по телеграму временно недоступны!'}
        # userSettings.telegramEnabled = data.telegramEnabled

    userSettings.save()
    return {'status': 'success', 'content': 'success'}


@router.get('/push_application_server_key')
async def push_application_server_key(Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()
    return {'status': 'success', 'content': {"applicationServerKey": config.application_server_key.get_secret_value()}}
