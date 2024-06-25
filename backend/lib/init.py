from pathlib import Path
secret_folder_path = Path(__file__).parent.parent.parent.absolute() / 'secret'
database_path = Path(__file__).parent.parent.absolute() / 'database.sqlite3'
expirationCodeTime = 10