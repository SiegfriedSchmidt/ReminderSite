from pprint import pprint

from fastapi import HTTPException, Depends, Request, FastAPI, APIRouter
from fastapi.responses import JSONResponse
from fastapi_jwt_auth import AuthJWT
from fastapi_jwt_auth.exceptions import AuthJWTException
from starlette.middleware.cors import CORSMiddleware

from lib.gmail_api import GmailApi
from lib.init import secret_folder_path
from lib.logger import setup_uvicorn_logger, setup_peewee_logger, logger
from lib.models import User, Event, Notification, create_tables, fill_json_data
from lib.pydantic_models import *
import asyncio
import uvicorn

from lib.verification_codes import VerificationCodes

verification_codes = VerificationCodes()
gmail_api = GmailApi(secret_folder_path)
create_tables()

router = APIRouter(prefix='/api')
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@AuthJWT.load_config
def get_config():
    return SettingsPydantic()


@app.exception_handler(AuthJWTException)
def authjwt_exception_handler(request: Request, exc: AuthJWTException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.message}
    )


@router.get('/')
async def main(request: Request):
    return {'title': 'about'}


@router.post('/auth/refresh')
async def refresh(Authorize: AuthJWT = Depends()):
    Authorize.jwt_refresh_token_required()

    current_user = Authorize.get_jwt_subject()
    new_access_token = Authorize.create_access_token(subject=current_user)
    return {"access_token": new_access_token}


@router.post('/auth/login')
async def login(request: Request, user: UserPydantic, Authorize: AuthJWT = Depends()):
    selected_user = User.select().where(User.username == user.username)
    if not selected_user.exists() or (user_auth := selected_user.get()).password != user.password:
        raise HTTPException(status_code=400, detail="Bad username or password")

    access_token = Authorize.create_access_token(subject=user.username)
    refresh_token = Authorize.create_refresh_token(subject=user.username)
    return {
        "accessToken": access_token,
        "refreshToken": refresh_token,
        "email": user_auth.email,
        "isAdmin": user_auth.isAdmin
    }


@router.post('/auth/register')
async def register(user: UserRegistrationPydantic, Authorize: AuthJWT = Depends()):
    if verification_codes.verify_code(user.code) != user.username:
        raise HTTPException(status_code=400, detail="Неверный код!")

    selected_user = User.select().where(User.username == user.username)
    if selected_user.exists():
        raise HTTPException(status_code=400, detail="Имя пользователя уже занято!")

    User.create(username=user.username, email=user.email, password=user.password, isAdmin=False)
    access_token = Authorize.create_access_token(subject=user.username)
    refresh_token = Authorize.create_refresh_token(subject=user.username)
    return {"accessToken": access_token, "refreshToken": refresh_token, 'isAdmin': False}


@router.post('/getcode')
async def getcode(username_email: UsernameEmailPydantic, Authorize: AuthJWT = Depends()):
    print(verification_codes.add_data_with_code(username_email.username))
    return "success"


@router.get('/event/getall')
async def event_get_all(Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()

    current_username = Authorize.get_jwt_subject()

    events = []
    for event in User.select().where(User.username == current_username).get().events:
        events.append(event.__dict__['__data__'])

    return events


@router.post('/event/add')
async def event_add(event: EventPydantic, Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()

    current_username = Authorize.get_jwt_subject()
    current_user = User.select().where(User.username == current_username)

    created_event = Event.create(title=event.title, description=event.description, date=event.date, user=current_user)
    return {"id": created_event.id}


@router.post('/event/update')
async def event_update(event: EventWithIdPydantic, Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()
    current_username = Authorize.get_jwt_subject()

    selected_event = Event.select().join(User).where(Event.id == event.id, User.username == current_username)
    if not selected_event.exists():
        raise HTTPException(status_code=400, detail="Событие отсутствует!")

    selected_event = selected_event.get()
    selected_event.title = event.title
    selected_event.description = event.description
    selected_event.date = event.date
    selected_event.save()
    return "success"


@router.post('/event/delete')
async def event_delete(eventId: EventIdPydantic, Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()
    current_username = Authorize.get_jwt_subject()

    selected_event = Event.select().join(User).where(Event.id == eventId.eventId, User.username == current_username)
    if not selected_event.exists():
        raise HTTPException(status_code=400, detail="Событие отсутствует!")

    selected_event.get().delete_instance()
    return "success"


async def main():
    app.include_router(router)
    config = uvicorn.Config(app, host='0.0.0.0', port=8000, log_level="debug", log_config=None)
    server = uvicorn.Server(config)
    setup_peewee_logger()
    setup_uvicorn_logger()
    print(*User.select(), sep='\n')
    await server.serve()


if __name__ == '__main__':
    # new_user = User(username='bob', email='bob@mail.ru', password='qwerty', isAdmin=False)
    # new_user.save()

    # fill_json_data('bob')

    # print(User.delete().execute())
    # print(Event.delete().execute())
    # print(len([*User.select().where(User.username == 'bob').get().events]))
    asyncio.run(main())
