from pydantic import BaseModel


class MemberBase(BaseModel):
    id: int
    name: str
