from typing import Optional

from pydantic import BaseModel


class DemonstrationSchema(BaseModel):
    id: int
    syllabus_item_id: int
    member_id: int
    flight_id: Optional[int]
    sufficient: bool

    class Config:
        orm_mode = True


class DemonstrationCreateSchema(BaseModel):
    syllabus_item_id: int
    member_id: int
    flight_id: Optional[int]
    sufficient: bool


class DemonstrationUpdateSchema(BaseModel):
    sufficient: bool
