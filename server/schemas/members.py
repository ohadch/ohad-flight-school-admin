from pydantic import BaseModel


class MemberSchema(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True


class MemberCreateSchema(BaseModel):
    name: str


class MemberUpdateSchema(BaseModel):
    name: str
