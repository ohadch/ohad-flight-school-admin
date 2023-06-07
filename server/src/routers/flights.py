from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from src.config.dependencies import get_db
from src.models import Flight
from src.schemas.flight import FlightSchema, FlightCreateSchema, FlightUpdateSchema

router = APIRouter(
    prefix="/flights",
    tags=["flights"],
    responses={404: {"description": "Not found"}},
)


@router.get("/", response_model=list[FlightSchema])
async def read_flights(db: Session = Depends(get_db)):
    return db.query(Flight).all()


@router.get("/{flight_id}", response_model=FlightSchema)
async def read_flight(flight_id: int, db: Session = Depends(get_db)):
    return db.query(Flight).get(flight_id)


@router.post("/", response_model=FlightSchema)
async def create_flight(flight_schema: FlightCreateSchema, db: Session = Depends(get_db)):
    flight = Flight(**flight_schema.__dict__)
    db.add(flight)
    db.commit()
    db.refresh(flight)
    return flight


@router.put("/{flight_id}", response_model=FlightSchema)
async def update_flight(flight_id: int, flight_schema: FlightUpdateSchema, db: Session = Depends(get_db)):
    flight = db.query(Flight).get(flight_id)
    for key, value in flight_schema.__dict__.items():
        setattr(flight, key, value)
    db.commit()
    db.refresh(flight)
    return flight


@router.delete("/{flight_id}")
async def delete_flight(flight_id: int, db: Session = Depends(get_db)):
    flight = db.query(Flight).get(flight_id)
    db.delete(flight)
    db.commit()
    return {"message": "Flight deleted successfully."}
