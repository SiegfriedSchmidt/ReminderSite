import peewee
from logger import setup_peewee_logger

setup_peewee_logger()
database = peewee.SqliteDatabase('database.sqlite3', pragmas={'foreign_keys': 1})

def create_tables():
    database.create_tables([User, Notification, Event])



class BaseModel(peewee.Model):
    class Meta:
        database = database


class User(BaseModel):
    id = peewee.AutoField()
    username = peewee.CharField(unique=True, max_length=256)
    email = peewee.CharField(max_length=256)
    password = peewee.CharField(max_length=256)
    isAdmin = peewee.BooleanField()


class Notification(BaseModel):
    time = peewee.TimeField(formats='%h:%m')
    email = peewee.CharField(max_length=256)
    push = peewee.BooleanField()
    telegram = peewee.BooleanField()
    user = peewee.ForeignKeyField(User, backref='notifications')


class Event(BaseModel):
    id = peewee.AutoField()
    title = peewee.CharField(max_length=256)
    description = peewee.TextField()
    date = peewee.DateField(formats='%d/%m/%Y')
    user = peewee.ForeignKeyField(User, backref='events')
