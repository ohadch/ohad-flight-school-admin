from sqlalchemy import Column, Integer, DateTime, ForeignKey, Float, Boolean
from sqlalchemy.orm import relationship

from src.config.database import Base


class Flight(Base):

    __tablename__ = "flights"

    id = Column(Integer, primary_key=True, index=True)
    date = Column(DateTime)
    student_id = Column(Integer, ForeignKey("members.id"))
    instructor_id = Column(Integer, ForeignKey("members.id"))
    solo = Column(
        Boolean,
    )
    duration_hours = Column(Float)

    demonstrations = relationship("Demonstration", back_populates="flight")

