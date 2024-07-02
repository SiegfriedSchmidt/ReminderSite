from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import SecretStr
from pathlib import Path

secret_folder_path = Path(__file__).parent.parent.absolute() / 'secret'
env_path = secret_folder_path / '.env'


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=env_path, env_file_encoding='utf-8', extra='allow')
    internal_token: SecretStr
    bot_token: SecretStr


config = Settings()
