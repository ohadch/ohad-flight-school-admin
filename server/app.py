from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Welcome to Ohad's gliding course management system"}


@app.get("/health")
async def health():
    return {"message": "OK"}