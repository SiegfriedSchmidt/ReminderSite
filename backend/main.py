from typing import Union
from fastapi import FastAPI
from models import *
import asyncio
import uvicorn


create_tables()
app = FastAPI(root_path='/api')


@app.get("/")
async def read_root():
    return {"Hello": "World"}


@app.get("/events/{username}")
async def read_item(username: str, q: Union[str, None] = None):
    print(username, q)
    print(Event.select())
    return 'lol'


async def main():
    config = uvicorn.Config(app, host='0.0.0.0', port=8000, log_level="info")
    server = uvicorn.Server(config)
    await server.serve()


if __name__ == '__main__':
    asyncio.run(main())
