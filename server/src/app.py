import os

import dotenv
from starlette.middleware.cors import CORSMiddleware

dotenv.load_dotenv(
    dotenv_path=os.path.join(os.path.dirname(__file__), "..", ".env")
)
from fastapi import FastAPI

from src.routers import members, endorsements

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Welcome to Ohad's gliding course management system"}


@app.get("/health")
async def health():
    return {"message": "OK"}


app.include_router(members.router)
app.include_router(endorsements.router)
