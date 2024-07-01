from fastapi import Depends, Request, APIRouter
from fastapi_another_jwt_auth import AuthJWT
from pydantic import BaseModel

from lib.init import verify_password, verification_codes, get_password_hash, expiration_code_time
from lib.models import User, UserSettings
from lib.logger import logger

router = APIRouter(prefix='/auth')


def json_user_data(access_token: str, refresh_token: str, user_auth: User, userSettings: UserSettings):
    return {
        "user": {
            "accessToken": access_token,
            "refreshToken": refresh_token,
            "username": user_auth.username,
            "email": user_auth.email,
            "isAdmin": user_auth.isAdmin
        },
        "userSettings": {
            "timeNotification": userSettings.timeNotification,
            "emailNotification": userSettings.emailNotification,
            "emailEnabled": userSettings.emailEnabled,
            "telegramEnabled": userSettings.telegramEnabled,
            "pushEnabled": userSettings.pushEnabled,
        }
    }


@router.post('/refresh')
async def refresh(Authorize: AuthJWT = Depends()):
    Authorize.jwt_refresh_token_required()

    current_username = Authorize.get_jwt_subject()
    if not User.select().where(User.username == current_username).exists():
        return {'status': 'error', 'content': 'Такого пользователя не существует!'}

    new_access_token = Authorize.create_access_token(subject=current_username)
    return {'status': 'success', "content": {"access_token": new_access_token}}


class UserPydantic(BaseModel):
    username: str
    password: str


@router.post('/login')
async def login(request: Request, user: UserPydantic, Authorize: AuthJWT = Depends()):
    selected_user = User.select().where(User.username == user.username)
    if not selected_user.exists() or not verify_password(user.password, (user_auth := selected_user.get()).password):
        return {'status': 'error', 'content': 'Неверный логин или пароль!'}

    access_token = Authorize.create_access_token(subject=user.username)
    refresh_token = Authorize.create_refresh_token(subject=user.username)
    userSettings = user_auth.userSettings.get()
    return {'status': 'success', 'content': json_user_data(access_token, refresh_token, user_auth, userSettings)}


class UserRegistrationPydantic(UserPydantic):
    email: str
    code: str


@router.post('/register')
async def register(user: UserRegistrationPydantic, Authorize: AuthJWT = Depends()):
    if verification_codes.verify_code(user.code) != user.username:
        return {'status': 'error', 'content': 'Неверный код!'}

    selected_user = User.select().where(User.username == user.username)
    if selected_user.exists():
        return {'status': 'error', 'content': 'Имя пользователя уже занято!'}

    user_auth = User.create(
        username=user.username, email=user.email, password=get_password_hash(user.password), isAdmin=False
    )

    userSettings = UserSettings.create(
        timeNotification='08:00', emailNotification=user_auth.email, emailEnabled=False, telegramId='',
        telegramEnabled=False, pushSubscription='', pushEnabled=False, user=user_auth
    )

    access_token = Authorize.create_access_token(subject=user.username)
    refresh_token = Authorize.create_refresh_token(subject=user.username)
    return {'status': 'success', 'content': json_user_data(access_token, refresh_token, user_auth, userSettings)}


class UsernameEmailPydantic(BaseModel):
    username: str
    email: str


@router.post('/getcode')
async def getcode(username_email: UsernameEmailPydantic, Authorize: AuthJWT = Depends()):
    code = verification_codes.add_data_with_code(username_email.username)
    logger.info(code)
    # gmail_api.send_email(username_email.email, 'Код проверки', code)
    return {'status': 'success', 'content': {"expirationTime": expiration_code_time}}
