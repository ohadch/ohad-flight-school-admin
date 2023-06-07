from sqlalchemy import Column, Integer, ForeignKey, DateTime, Boolean
from sqlalchemy.orm import relationship

from src.config.database import Base


class Demonstration(Base):

    __tablename__ = "demonstrations"

    id = Column(Integer, primary_key=True, index=True)
    syllabus_item_id = Column(
        Integer,
        ForeignKey("syllabus_items.id"),
        nullable=False,
    )
    enrollment_id = Column(
        Integer,
        ForeignKey("enrollments.id"),
        nullable=False,
    )
    flight_id = Column(
        Integer,
        ForeignKey("flights.id"),
        nullable=True,
    )
    sufficient = Column(
        Boolean,
        nullable=False,
    )

    syllabus_item = relationship("SyllabusItem", back_populates="demonstrations")
    enrollment = relationship("Enrollment", back_populates="demonstrations")
    flight = relationship("Flight", back_populates="demonstrations")
