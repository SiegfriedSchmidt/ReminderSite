from typing import Union
from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.responses import JSONResponse
from fastapi_jwt_auth import AuthJWT
from fastapi_jwt_auth.exceptions import AuthJWTException
from lib.models import User, Event, Notification, create_tables
from lib.pydantic_models import UserPydantic, SettingsPydantic
import asyncio
import uvicorn

create_tables()
app = FastAPI(root_path='/api')


@AuthJWT.load_config
def get_config():
    return SettingsPydantic()


@app.exception_handler(AuthJWTException)
def authjwt_exception_handler(request: Request, exc: AuthJWTException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.message}
    )


@app.get("/")
async def read_root():
    return {"Hello": "World"}


@app.get("/events/{username}")
async def read_item(username: str, q: Union[str, None] = None):
    print(username, q)
    print(Event.select())
    return 'lol'


@app.post('/login')
async def login(user: User, Authorize: AuthJWT = Depends()):
    if user.username != "test" or user.password != "test":
        raise HTTPException(status_code=401, detail="Bad username or password")

    access_token = Authorize.create_access_token(subject=user.username)
    return {"access_token": access_token}


@app.get('/user')
async def user(Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()

    current_user = Authorize.get_jwt_subject()
    return {"user": current_user}


async def main():
    config = uvicorn.Config(app, host='0.0.0.0', port=8000, log_level="info")
    server = uvicorn.Server(config)
    await server.serve()


if __name__ == '__main__':
    # new_user = User(username='user_1', email='fff@mail.ru', password='fffff', isAdmin=False)
    # new_user.save()

    # print(*User.select(), sep='\n')
    # print(User.delete().execute())
    # print(Event.delete().execute())
    # print(len([*User.select().where(User.username == 'bob').get().events]))
    asyncio.run(main())
