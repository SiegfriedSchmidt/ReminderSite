from typing import List

import requests
from config_reader import config

headers = {'token': config.internal_token.get_secret_value()}
base_path = 'http://192.168.1.1:8003/api/internal'


def get_today_events():
    rs = requests.get(base_path + '/get_today_events', headers=headers)
    return rs.json()['events']


def send_push_notifications(pushSubscriptions: List[str], title: str, body: str):
    rs = requests.post(base_path + '/send_push_notifications', headers=headers, json={
        'pushSubscriptions': pushSubscriptions,
        'title': title,
        'body': body
    })
