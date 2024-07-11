import json
import requests
import datetime
from lib.config_reader import config
from lib.init import server_host, server_port

headers = {'token': config.internal_token.get_secret_value()}
base_path = f'http://{server_host}:{server_port}/api/internal'


def fill_test_events_data(username: str):
    with open('../../test/data.json', 'r', encoding='utf-8') as file:
        json_data = json.load(file)

    # 2024-07-25
    events = [{
        'date': datetime.datetime.strptime(event['date'], '%m/%d/%Y').strftime('%Y-%m-%d'),
        'title': event['title'],
        'description': '',
    } for event in json_data]

    rs = requests.post(base_path + '/add_events', headers=headers, json={'events': events, 'username': username})
    if rs.status_code != 200:
        return print(rs.text)
    else:
        print(rs.json())


if __name__ == '__main__':
    fill_test_events_data('bob')
