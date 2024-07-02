import os
from pathlib import Path
from passlib.context import CryptContext
from lib.verification_codes import VerificationCodes

# from lib.gmail_api import GmailApi
# from lib.logger import setup_gmail_api_logger

secret_folder_path = os.environ.get("SECRET_FOLDER_PATH", Path(__file__).parent.parent.parent.absolute() / 'secret')
database_path = os.environ.get("DATABASE_FOLDER_PATH", Path(__file__).parent.parent.absolute() / 'database.sqlite3')
expiration_code_time = os.environ.get("EXPIRATION_CODE_TIME", 40)
admin_email = os.environ.get("ADMIN_EMAIL", 'admin@mail.ru')
server_host = os.environ.get("HOST", "192.168.1.15")
server_port = os.environ.get("PORT", 8003)

vapid_private_key_path = secret_folder_path / 'private_key.pem'
verification_codes = VerificationCodes(expiration_code_time)
pwd_context = CryptContext(schemes=["bcrypt"], deprecated='auto')


# gmail_api = GmailApi(secret_folder_path, setup_gmail_api_logger())


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)
