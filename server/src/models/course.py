from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from src.config.database import Base


class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, unique=True)

    enrollments = relationship("Enrollment", back_populates="course")
