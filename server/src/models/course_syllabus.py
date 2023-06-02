from sqlalchemy import UniqueConstraint, Column, Integer, ForeignKey
from sqlalchemy.orm import relationship

from src.config.database import Base


class InstructionPlanSyllabus(Base):

    __tablename__ = "course_syllabuses"

    id = Column(Integer, primary_key=True, index=True)
    course_id = Column(
        Integer,
        ForeignKey("courses.id"),
    )
    syllabus_id = Column(
        Integer,
        ForeignKey("syllabuses.id"),
    )

    __table_args__ = (
        UniqueConstraint(
            "course_id",
            "syllabus_id",
            name="course_syllabus_course_id_syllabus_id_uc",
        ),
    )

    course = relationship("Course")
    syllabus = relationship("Syllabus")
