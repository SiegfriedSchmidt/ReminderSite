import datetime
from pprint import pprint

import peewee
from lib.init import database_path

database = peewee.SqliteDatabase(database_path, pragmas={'foreign_keys': 1})


def create_tables():
    database.create_tables([User, UserSettings, Event, Subscription])


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


class UserSettings(BaseModel):
    timeNotification = peewee.TimeField(formats='%h:%m')
    emailNotification = peewee.CharField(max_length=256)
    telegramId = peewee.CharField(max_length=256)
    emailEnabled = peewee.BooleanField()
    telegramEnabled = peewee.BooleanField()
    pushEnabled = peewee.BooleanField()
    user = peewee.ForeignKeyField(User, backref='userSettings')


class Subscription(BaseModel):
    pushSubscription = peewee.CharField(max_length=512, unique=True)
    user = peewee.ForeignKeyField(User, backref='subscriptions')


class Event(BaseModel):
    id = peewee.AutoField()
    title = peewee.CharField(max_length=256)
    description = peewee.TextField()
    date = peewee.DateField(formats='%d/%m/%Y')
    user = peewee.ForeignKeyField(User, backref='events')


if __name__ == '__main__':
    # database.drop_tables((User, Event, UserSettings, Subscription))
    # create_tables()
    userSettings = [*UserSettings.select()]
    events = [*Event.select()]
    users = [*User.select()]
    subscriptions = [sub.pushSubscription for sub in Subscription.select(Subscription.pushSubscription)]
    # print(events)
    # print(userSettings)
    # print([*UserSettings.select()])
    # print(*subscriptions, sep='\n')
    # print(len(userSettings), len(events), len(users))

    events = []
    today = datetime.date.today()
    current_day = f'{today.day:02}'
    current_month = f'{today.month:02}'
    for event in Event.select().where(peewee.fn.strftime('%d', Event.date) == current_day,
                                      peewee.fn.strftime('%m', Event.date) == current_month):
        user = event.user.select().get()
        userSettings = user.userSettings.get()
        pushSubscriptions = [sub.pushSubscription for sub in user.subscriptions.select(Subscription.pushSubscription)]
        events.append({
            'username': user.username,
            'title': event.title,
            'date': event.date,
            'description': event.description,
            'years': today.year - datetime.datetime.strptime(event.date, '%Y-%m-%d').year,
            'timeNotification': userSettings.timeNotification,
            'pushEnabled': userSettings.pushEnabled,
            'emailEnabled': userSettings.emailEnabled,
            'telergamEnabled': userSettings.telegramEnabled,
            'emailNotification': userSettings.emailNotification,
            'telergamId': userSettings.telegramId,
            'pushSubscriptions': pushSubscriptions,
        })
    pprint(events)
