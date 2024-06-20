from pydantic import BaseModel
from lib.config_reader import config


class UserPydantic(BaseModel):
    username: str
    password: str

class SettingsPydantic(BaseModel):
    authjwt_secret_key: str = config.jwt_secret_key.get_secret_value()