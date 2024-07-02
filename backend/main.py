from fastapi import Request, FastAPI, APIRouter
from fastapi.responses import JSONResponse
from fastapi_another_jwt_auth import AuthJWT
from fastapi_another_jwt_auth.exceptions import AuthJWTException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from lib.config_reader import config
from lib.init import server_host, server_port
from lib.logger import setup_uvicorn_logger, setup_peewee_logger
from lib.logger import logger

import asyncio
import uvicorn
import lib.routers.auth_router as auth_router
import lib.routers.event_router as event_router
import lib.routers.internal_router as internal_router
import lib.routers.userSettings_router as userSettings_router

main_router = APIRouter(prefix='/api')
app = FastAPI(title='fastapi')
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class SettingsPydantic(BaseModel):
    authjwt_secret_key: str = config.jwt_secret_key.get_secret_value()


@AuthJWT.load_config
def get_config():
    return SettingsPydantic()


@app.exception_handler(AuthJWTException)
def authjwt_exception_handler(request: Request, exc: AuthJWTException):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "status": "error",
            "detail": exc.message
        }
    )


@main_router.get('/')
async def main(request: Request):
    return {'title': 'Hello, world!'}


async def main():
    main_router.include_router(auth_router.router)
    main_router.include_router(event_router.router)
    main_router.include_router(internal_router.router)
    main_router.include_router(userSettings_router.router)

    setup_peewee_logger()
    setup_uvicorn_logger()

    app.include_router(main_router)
    config = uvicorn.Config(app, host=server_host, port=server_port, log_level="debug", log_config=None)
    server = uvicorn.Server(config)

    await server.serve()


if __name__ == '__main__':
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        logger.info('Server successfully exited.')
