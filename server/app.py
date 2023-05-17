import os

import dotenv

dotenv.load_dotenv(
    dotenv_path=os.path.join(os.path.dirname(__file__), "..", ".env")
)
from fastapi import FastAPI

from server.routers import members

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Welcome to Ohad's gliding course management system"}


@app.get("/health")
async def health():
    return {"message": "OK"}


app.include_router(members.router)
