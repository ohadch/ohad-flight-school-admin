import enum

from sqlalchemy import Column, Integer, ForeignKey, Enum
from sqlalchemy.orm import relationship

from src.config.database import Base


class EnrollmentStatus(enum.Enum):
    PENDING = "pending"
    COURSE_IN_PROGRESS = "course_in_progress"
    COURSE_COMPLETED = "course_completed"
    CANCELED = "canceled"


class Enrollment(Base):

    __tablename__ = "enrollments"

    id = Column(Integer, primary_key=True, index=True)
    member_id = Column(Integer, ForeignKey("members.id"))
    course_id = Column(Integer, ForeignKey("courses.id"))

    status = Column(
        Enum(EnrollmentStatus),
        nullable=False,
        default=EnrollmentStatus.PENDING,
    )

    member = relationship("Member", back_populates="enrollments")
    course = relationship("Course", back_populates="enrollments")
    demonstrations = relationship("Demonstration", back_populates="enrollment")
