from typing import Optional

from pydantic import BaseModel


class InstructionPlanSchema(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True


class InstructionPlanCreateSchema(BaseModel):
    name: str


class InstructionPlanUpdateSchema(BaseModel):
    name: str
