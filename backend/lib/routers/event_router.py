from fastapi import HTTPException, Depends, APIRouter
from fastapi_another_jwt_auth import AuthJWT
from pydantic import BaseModel

from lib.models import User, Event

router = APIRouter(prefix='/event')


@router.get('/getall')
async def event_get_all(Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()

    current_username = Authorize.get_jwt_subject()

    if not User.select().where(User.username == current_username).exists():
        return {'status': 'error', 'content': "Такого пользователя не существует!"}

    events = []
    for event in User.select().where(User.username == current_username).get().events:
        events.append(event.__dict__['__data__'])

    return {'status': 'success', 'content': events}


class EventPydantic(BaseModel):
    title: str
    description: str
    date: str


@router.post('/add')
async def event_add(event: EventPydantic, Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()

    current_username = Authorize.get_jwt_subject()
    current_user = User.select().where(User.username == current_username)

    created_event = Event.create(title=event.title, description=event.description, date=event.date, user=current_user)
    return {'status': 'success', 'content': {"id": created_event.id}}


class EventWithIdPydantic(EventPydantic):
    id: int


@router.post('/update')
async def event_update(event: EventWithIdPydantic, Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()
    current_username = Authorize.get_jwt_subject()

    current_user = User.select().where(User.username == current_username)
    selected_event = Event.select().join(User).where(Event.id == event.id & Event.user == current_user)
    if not selected_event.exists():
        return {'status': 'error', 'content': "Событие отсутствует!"}

    selected_event = selected_event.get()
    selected_event.title = event.title
    selected_event.description = event.description
    selected_event.date = event.date
    selected_event.save()
    return {'status': 'success', 'content': "success"}


class EventIdPydantic(BaseModel):
    eventId: int


@router.post('/delete')
async def event_delete(data: EventIdPydantic, Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()
    current_username = Authorize.get_jwt_subject()

    current_user = User.select().where(User.username == current_username)
    selected_event = Event.select().join(User).where(Event.id == data.eventId & Event.user == current_user)
    if not selected_event.exists():
        return {'status': 'error', 'content': "Событие отсутствует!"}

    selected_event.get().delete_instance()
    return {'status': 'success', 'content': "success"}
