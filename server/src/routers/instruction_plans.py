from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from src.config.dependencies import get_db
from src.models import InstructionPlan, InstructionPlanSyllabus
from src.schemas.instruction_plan import InstructionPlanSchema, InstructionPlanCreateSchema, InstructionPlanUpdateSchema
from src.schemas.instruction_plan_syllabus import InstructionPlanSyllabusSchema
from src.schemas.syllabus import SyllabusSchema

router = APIRouter(
    prefix="/instruction_plans",
    tags=["instruction_plans"],
    responses={404: {"description": "Not found"}},
)


@router.get("/", response_model=list[InstructionPlanSchema])
async def read_instruction_plans(db: Session = Depends(get_db)):
    return db.query(InstructionPlan).all()


@router.get("/{instruction_plan_id}", response_model=InstructionPlanSchema)
async def read_instruction_plan(instruction_plan_id: int, db: Session = Depends(get_db)):
    return db.query(InstructionPlan).get(instruction_plan_id)


@router.get("/{instruction_plan_id}/syllabuses", response_model=list[SyllabusSchema])
async def read_instruction_plan_syllabuses(instruction_plan_id: int, db: Session = Depends(get_db)):
    instruction_plan_syllabuses_connections = db.query(InstructionPlanSyllabus).filter_by(
        instruction_plan_id=instruction_plan_id
    )

    return [
        instruction_plan_syllabus_connection.syllabus
        for instruction_plan_syllabus_connection in instruction_plan_syllabuses_connections
    ]


@router.post("/{instruction_plan_id}/syllabuses", response_model=InstructionPlanSyllabusSchema)
async def add_syllabus_to_instruction_plan(instruction_plan_id: int, syllabus_id: int, db: Session = Depends(get_db)):
    instruction_plan_syllabus = InstructionPlanSyllabus(
        instruction_plan_id=instruction_plan_id,
        syllabus_id=syllabus_id,
    )
    db.add(instruction_plan_syllabus)
    db.commit()
    db.refresh(instruction_plan_syllabus)
    return instruction_plan_syllabus


@router.delete("/{instruction_plan_id}/syllabuses")
async def remove_syllabus_from_instruction_plan(instruction_plan_id: int, syllabus_id: int, db: Session = Depends(get_db)):
    instruction_plan_syllabus = db.query(InstructionPlanSyllabus).filter_by(
        instruction_plan_id=instruction_plan_id,
        syllabus_id=syllabus_id,
    ).first()
    db.delete(instruction_plan_syllabus)
    db.commit()
    return {"message": "Syllabus removed from instruction plan successfully."}


@router.post("/", response_model=InstructionPlanSchema)
async def create_instruction_plan(instruction_plan_schema: InstructionPlanCreateSchema, db: Session = Depends(get_db)):
    instruction_plan = InstructionPlan(**instruction_plan_schema.__dict__)
    db.add(instruction_plan)
    db.commit()
    db.refresh(instruction_plan)
    return instruction_plan


@router.put("/{instruction_plan_id}", response_model=InstructionPlanSchema)
async def update_instruction_plan(instruction_plan_id: int, instruction_plan_schema: InstructionPlanUpdateSchema, db: Session = Depends(get_db)):
    instruction_plan = db.query(InstructionPlan).get(instruction_plan_id)
    for key, value in instruction_plan_schema.__dict__.items():
        setattr(instruction_plan, key, value)
    db.commit()
    db.refresh(instruction_plan)
    return instruction_plan


@router.delete("/{instruction_plan_id}")
async def delete_instruction_plan(instruction_plan_id: int, db: Session = Depends(get_db)):
    instruction_plan = db.query(InstructionPlan).get(instruction_plan_id)
    db.delete(instruction_plan)
    db.commit()
    return {"message": "InstructionPlan deleted successfully."}
