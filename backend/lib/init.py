from pathlib import Path

secret_folder_path = Path(__file__).parent.parent.parent.absolute() / 'secret'
database_path = Path(__file__).parent.parent.absolute() / 'database.sqlite3'
vapid_private_key_path = secret_folder_path / 'private_key.pem'
expirationCodeTime = 40
ADMIN_EMAIL = 'admin@mail.ru'
