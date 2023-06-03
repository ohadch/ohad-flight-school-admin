import enum

from sqlalchemy import Column, Integer, String, Enum
from sqlalchemy.orm import relationship

from src.config.database import Base


class MemberStatus(enum.Enum):
    BEFORE_SOLO_STUDENT = "before_solo_student"
    SOLO_STUDENT = "solo_student"
    PRIVATE_PILOT = "private_pilot"
    CFI = "cfi"


class Member(Base):

    __tablename__ = "members"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    status = Column(
        Enum(MemberStatus),
        nullable=False,
    )

    documents = relationship("MemberDocument", back_populates="member")
    enrollments = relationship("Enrollment", back_populates="member")
