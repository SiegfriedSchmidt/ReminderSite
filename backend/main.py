from fastapi import HTTPException, Depends, Request, FastAPI, APIRouter
from fastapi.responses import JSONResponse
from fastapi_jwt_auth import AuthJWT
from fastapi_jwt_auth.exceptions import AuthJWTException
from starlette.middleware.cors import CORSMiddleware

from lib.models import User, Event, Notification, create_tables, fill_json_data
from lib.pydantic_models import UserPydantic, SettingsPydantic
import asyncio
import uvicorn

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
async def login(user: UserPydantic, Authorize: AuthJWT = Depends()):
    selected_user = User.select().where(User.username == user.username)
    if not selected_user.exists() or (user_auth := selected_user.get()).password != user.password:
        raise HTTPException(status_code=401, detail="Bad username or password")

    access_token = Authorize.create_access_token(subject=user.username)
    refresh_token = Authorize.create_refresh_token(subject=user.username)
    return {
        "accessToken": access_token,
        "refreshToken": refresh_token,
        "email": user_auth.email,
        "isAdmin": user_auth.isAdmin
    }


@router.post('/auth/register')
async def login(user: UserPydantic, Authorize: AuthJWT = Depends()):
    if user.username != "test" or user.password != "test":
        raise HTTPException(status_code=401, detail="Bad username or password")

    access_token = Authorize.create_access_token(subject=user.username)
    refresh_token = Authorize.create_refresh_token(subject=user.username)
    return {"access_token": access_token, "refresh_token": refresh_token}


@router.get('/events')
async def user(Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()

    current_user: UserPydantic = Authorize.get_jwt_subject()

    events = []
    for event in User.select().where(User.username == current_user).get().events:
        events.append(event.__dict__['__data__'])

    return events


async def main():
    app.include_router(router)
    config = uvicorn.Config(app, host='0.0.0.0', port=8000, log_level="info")
    server = uvicorn.Server(config)
    await server.serve()


if __name__ == '__main__':
    # new_user = User(username='bob', email='bob@mail.ru', password='qwerty', isAdmin=False)
    # new_user.save()

    # fill_json_data('bob')
    print(*User.select(), sep='\n')
    # print(User.delete().execute())
    # print(Event.delete().execute())
    # print(len([*User.select().where(User.username == 'bob').get().events]))
    asyncio.run(main())
