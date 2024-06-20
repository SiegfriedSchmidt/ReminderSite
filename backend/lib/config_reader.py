from pydantic import SecretStr
from pydantic_settings import BaseSettings, SettingsConfigDict
from pathlib import Path

env_path = Path(__file__).parent.parent.absolute() / Path('.env')

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=env_path, env_file_encoding='utf-8')
    jwt_secret_key: SecretStr = 'xxx'


config = Settings()