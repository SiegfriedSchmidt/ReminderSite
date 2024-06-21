import peewee
import json
from lib.logger import setup_peewee_logger

setup_peewee_logger()
database = peewee.SqliteDatabase('database.sqlite3', pragmas={'foreign_keys': 1})


def create_tables():
    database.create_tables([User, Notification, Event])


def fill_json_data(username: str):
    with open('test/data.json', 'r') as file:
        json_data = json.load(file)

    user = User.select().where(User.username == username).get()
    with database.atomic():
        for data_dict in json_data:
            Event.create(**data_dict, description='', user=user)


class BaseModel(peewee.Model):
    class Meta:
        database = database

    def __str__(self):
        return str(self.__dict__['__data__'])


class User(BaseModel):
    id = peewee.AutoField()
    username = peewee.CharField(unique=True, max_length=256)
    email = peewee.CharField(max_length=256)
    password = peewee.CharField(max_length=256)
    isAdmin = peewee.BooleanField()


class Notification(BaseModel):
    time = peewee.TimeField(formats='%h:%m')
    email = peewee.CharField(max_length=256)
    telegram = peewee.CharField(max_length=256)
    push = peewee.BooleanField()
    user = peewee.ForeignKeyField(User, backref='notifications')


class Event(BaseModel):
    id = peewee.AutoField()
    title = peewee.CharField(max_length=256)
    description = peewee.TextField()
    date = peewee.DateField(formats='%d/%m/%Y')
    user = peewee.ForeignKeyField(User, backref='events')
