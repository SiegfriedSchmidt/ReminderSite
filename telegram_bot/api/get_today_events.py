from pprint import pprint
import requests
from config_reader import config

headers = {'token': config.internal_token.get_secret_value()}
rs = requests.get('http://localhost:8003/api/internal/get_today_events', headers=headers)

data = rs.json()
pprint(data['events'])
