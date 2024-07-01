import json
from lib.models import *


def fill_test_events_data(username: str):
    with open('../../test/data.json', 'r', encoding='utf-8') as file:
        json_data = json.load(file)

    user = User.select().where(User.username == username).get()
    with database.atomic():
        for data_dict in json_data:
            Event.create(**data_dict, description='', user=user)


if __name__ == '__main__':
    fill_test_events_data('bob')
