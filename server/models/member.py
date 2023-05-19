from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from server.config.db import Base


class Member(Base):

    __tablename__ = "members"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)

    members_endorsements = relationship("MemberEndorsement", back_populates="member")
