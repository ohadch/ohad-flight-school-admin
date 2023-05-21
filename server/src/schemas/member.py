from pydantic import BaseModel, Field


MIN_LENGTH_NAME = 3


class MemberSchema(BaseModel):
    id: int
    name: str = Field(..., min_length=MIN_LENGTH_NAME)
    is_before_solo_student: bool
    is_solo_student: bool
    is_private_pilot: bool
    is_cfi: bool

    class Config:
        orm_mode = True


class MemberCreateSchema(BaseModel):
    name: str = Field(..., min_length=MIN_LENGTH_NAME)
    is_before_solo_student: bool
    is_solo_student: bool
    is_private_pilot: bool
    is_cfi: bool


class MemberUpdateSchema(BaseModel):
    name: str = Field(..., min_length=MIN_LENGTH_NAME)
    is_before_solo_student: bool
    is_solo_student: bool
    is_private_pilot: bool
    is_cfi: bool
