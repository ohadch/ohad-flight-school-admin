from pydantic import BaseModel, Field


MIN_LENGTH_NAME = 3


class EndorsementSchema(BaseModel):
    id: int
    name: str = Field(..., min_length=MIN_LENGTH_NAME)

    class Config:
        orm_mode = True


class EndorsementCreateSchema(BaseModel):
    name: str = Field(..., min_length=MIN_LENGTH_NAME)


class EndorsementUpdateSchema(BaseModel):
    name: str = Field(..., min_length=MIN_LENGTH_NAME)
