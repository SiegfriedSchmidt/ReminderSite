from pydantic import SecretStr, BaseSettings
from pathlib import Path

env_path = Path(__file__).parent.parent.absolute() / Path('.env')

class Settings(BaseSettings):
    jwt_secret_key: SecretStr

    class Config:
        env_file = env_path
        env_file_encoding = 'utf-8'

config = Settings()