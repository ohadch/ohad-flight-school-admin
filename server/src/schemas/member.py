from pydantic import BaseModel, Field


MIN_LENGTH_NAME = 3


class MemberSchema(BaseModel):
    id: int
    name: str = Field(..., min_length=MIN_LENGTH_NAME)

    class Config:
        orm_mode = True


class MemberCreateSchema(BaseModel):
    name: str = Field(..., min_length=MIN_LENGTH_NAME)


class MemberUpdateSchema(BaseModel):
    name: str = Field(..., min_length=MIN_LENGTH_NAME)
