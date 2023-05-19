from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship

from src.config.database import Base


class MemberEndorsement(Base):
    __tablename__ = "members_endorsements"

    id = Column(Integer, primary_key=True, index=True)
    member_id = Column(Integer, ForeignKey("members.id"))
    endorsement_id = Column(Integer, ForeignKey("endorsements.id"))

    member = relationship("Member", back_populates="members_endorsements")
    endorsement = relationship("Endorsement", back_populates="members_endorsements")
