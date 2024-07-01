from pathlib import Path
from passlib.context import CryptContext
from lib.gmail_api import GmailApi
from lib.logger import setup_gmail_api_logger
from lib.verification_codes import VerificationCodes

secret_folder_path = Path(__file__).parent.parent.parent.absolute() / 'secret'
database_path = Path(__file__).parent.parent.absolute() / 'database.sqlite3'
vapid_private_key_path = secret_folder_path / 'private_key.pem'
expiration_code_time = 40
ADMIN_EMAIL = 'admin@mail.ru'

verification_codes = VerificationCodes(expiration_code_time)
pwd_context = CryptContext(schemes=["bcrypt"], deprecated='auto')
gmail_api = GmailApi(secret_folder_path, setup_gmail_api_logger())


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)
