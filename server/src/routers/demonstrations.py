from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from src.config.dependencies import get_db
from src.models import Demonstration
from src.schemas.demonstration import DemonstrationSchema, DemonstrationCreateSchema, DemonstrationUpdateSchema

router = APIRouter(
    prefix="/demonstrations",
    tags=["demonstrations"],
    responses={404: {"description": "Not found"}},
)


@router.get("/", response_model=list[DemonstrationSchema])
async def read_demonstrations(db: Session = Depends(get_db)):
    return db.query(Demonstration).all()


@router.get("/{demonstration_id}", response_model=DemonstrationSchema)
async def read_demonstration(demonstration_id: int, db: Session = Depends(get_db)):
    return db.query(Demonstration).get(demonstration_id)


@router.post("/", response_model=DemonstrationSchema)
async def create_demonstration(demonstration_schema: DemonstrationCreateSchema, db: Session = Depends(get_db)):
    demonstration = Demonstration(**demonstration_schema.__dict__)
    db.add(demonstration)
    db.commit()
    db.refresh(demonstration)
    return demonstration


@router.put("/{demonstration_id}", response_model=DemonstrationSchema)
async def update_demonstration(demonstration_id: int, demonstration_schema: DemonstrationUpdateSchema, db: Session = Depends(get_db)):
    demonstration = db.query(Demonstration).get(demonstration_id)
    for key, value in demonstration_schema.__dict__.items():
        setattr(demonstration, key, value)
    db.commit()
    db.refresh(demonstration)
    return demonstration


@router.delete("/{demonstration_id}")
async def delete_demonstration(demonstration_id: int, db: Session = Depends(get_db)):
    demonstration = db.query(Demonstration).get(demonstration_id)
    db.delete(demonstration)
    db.commit()
    return {"message": "Demonstration deleted successfully."}
