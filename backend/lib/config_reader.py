from pydantic import SecretStr, BaseSettings
from pathlib import Path
from lib.init import secret_folder_path

env_path = secret_folder_path / Path('.env')

class Settings(BaseSettings):
    jwt_secret_key: SecretStr

    class Config:
        env_file = env_path
        env_file_encoding = 'utf-8'

config = Settings()