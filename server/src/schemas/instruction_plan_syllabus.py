from pydantic import BaseModel


class InstructionPlanSyllabusSchema(BaseModel):
    id: int
    instruction_plan_id: int
    syllabus_id: int

    class Config:
        orm_mode = True


class InstructionPlanSyllabusCreateSchema(BaseModel):
    instruction_plan_id: int
    syllabus_id: int


class InstructionPlanSyllabusUpdateSchema(BaseModel):
    instruction_plan_id: int
    syllabus_id: int
