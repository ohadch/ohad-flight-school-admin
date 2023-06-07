import datetime

from pydantic import BaseModel


class FlightSchema(BaseModel):
    id: int
    date: datetime.datetime
    student_id: int
    instructor_id: int
    solo: bool
    duration_hours: int

    class Config:
        orm_mode = True


class FlightCreateSchema(BaseModel):
    date: datetime.datetime
    student_id: int
    instructor_id: int
    solo: bool
    duration_hours: int


class FlightUpdateSchema(BaseModel):
    date: datetime.datetime
    student_id: int
    instructor_id: int
    solo: bool
    duration_hours: int
