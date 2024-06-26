import datetime
from pydantic import BaseModel
from lib.config_reader import config
from typing import Any


class UserPydantic(BaseModel):
    username: str
    password: str


class UserRegistrationPydantic(UserPydantic):
    email: str
    code: str


class UsernameEmailPydantic(BaseModel):
    username: str
    email: str


class EventPydantic(BaseModel):
    title: str
    description: str
    date: str


class EventWithIdPydantic(EventPydantic):
    id: int


class SettingsPydantic(BaseModel):
    authjwt_secret_key: str = config.jwt_secret_key.get_secret_value()


class CodePydantic(BaseModel):
    creation_time: datetime.datetime
    expiration: int
    data: Any


class EventIdPydantic(BaseModel):
    eventId: int


class NotificationTimePydantic(BaseModel):
    time: str


class NotificationPushPydantic(BaseModel):
    pushEnabled: bool


class NotificationEmailPydantic(BaseModel):
    emailEnabled: bool


class NotificationTelegramPydantic(BaseModel):
    telegramEnabled: bool


class InternalTokenVerifiedPydantic(BaseModel):
    verified: bool
