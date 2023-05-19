from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from src.config.dependencies import get_db
from src.models import Endorsement
from src.schemas.endorsement import EndorsementSchema, EndorsementCreateSchema, EndorsementUpdateSchema

router = APIRouter(
    prefix="/endorsements",
    tags=["endorsements"],
    responses={404: {"description": "Not found"}},
)


@router.get("/", response_model=list[EndorsementSchema])
async def read_endorsements(db: Session = Depends(get_db)):
    return db.query(Endorsement).all()


@router.get("/{endorsement_id}", response_model=EndorsementSchema)
async def read_endorsement(endorsement_id: int, db: Session = Depends(get_db)):
    return db.query(Endorsement).get(endorsement_id)


@router.post("/", response_model=EndorsementSchema)
async def create_endorsement(endorsement_schema: EndorsementCreateSchema, db: Session = Depends(get_db)):
    endorsement = Endorsement(name=endorsement_schema.name)
    db.add(endorsement)
    db.commit()
    db.refresh(endorsement)
    return endorsement


@router.put("/{endorsement_id}", response_model=EndorsementSchema)
async def update_endorsement(endorsement_id: int, endorsement_schema: EndorsementUpdateSchema, db: Session = Depends(get_db)):
    endorsement = db.query(Endorsement).get(endorsement_id)
    endorsement.name = endorsement_schema.name
    db.commit()
    db.refresh(endorsement)
    return endorsement


@router.delete("/{endorsement_id}")
async def delete_endorsement(endorsement_id: int, db: Session = Depends(get_db)):
    endorsement = db.query(Endorsement).get(endorsement_id)
    db.delete(endorsement)
    db.commit()
    return {"message": "Endorsement deleted successfully."}
