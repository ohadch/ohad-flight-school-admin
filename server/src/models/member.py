from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import relationship

from src.config.database import Base


class Member(Base):

    __tablename__ = "members"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)

    is_before_solo_student = Column(Boolean, default=False)
    is_solo_student = Column(Boolean, default=False)
    is_private_pilot = Column(Boolean, default=False)
    is_cfi = Column(Boolean, default=False)
