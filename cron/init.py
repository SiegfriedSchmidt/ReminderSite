import os
from pathlib import Path

api_host = os.environ.get("API_HOST", "192.168.1.15")
api_port = os.environ.get("API_PORT", "8003")
register_events_time = os.environ.get("REGISTER_EVENTS_TIME", "08:00")
disable_notification_timout = int(os.environ.get("DISABLE_NOTIFICATION_TIMEOUT", 10))
secret_folder_path = Path(os.environ.get("SECRET_FOLDER_PATH", Path(__file__).parent.parent.absolute() / 'secret'))
