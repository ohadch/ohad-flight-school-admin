import enum

from sqlalchemy import Column, Integer, ForeignKey, DateTime, UniqueConstraint, String
from sqlalchemy.orm import relationship

from src.config.database import Base


class MemberDocumentType(enum.Enum):
    STUDENT_LICENSE = "student_license"
    MEDICAL = "medical"
    MEMBERSHIP_AGREEMENT = "membership_agreement"


class MemberDocument(Base):

    __tablename__ = "member_documents"
    __tableargs__ = (
        UniqueConstraint("member_id", "type", name="member_document_member_id_type_unique"),
    )

    id = Column(Integer, primary_key=True, index=True)
    member_id = Column(Integer, ForeignKey("members.id"))
    type = Column(
        String,
        nullable=False,
    )
    expiration_at = Column(DateTime, nullable=True)

    member = relationship("Member", back_populates="documents")

