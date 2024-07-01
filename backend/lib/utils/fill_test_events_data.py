import json
from lib.models import *


def fill_test_events_data(username: str):
    with open('../test/data.json', 'r') as file:
        json_data = json.load(file)

    user = User.select().where(User.username == username).get()
    with database.atomic():
        for data_dict in json_data:
            Event.create(**data_dict, description='', user=user)
