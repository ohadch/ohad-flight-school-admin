import enum

from sqlalchemy import Column, Integer, ForeignKey, DateTime, Enum
from sqlalchemy.orm import relationship

from src.config.database import Base


class MemberDocumentStatus(enum.Enum):
    PENDING = "pending"
    VALID = "valid"


class MemberDocument(Base):

    __tablename__ = "member_documents"

    id = Column(Integer, primary_key=True, index=True)
    member_id = Column(Integer, ForeignKey("members.id"))
    type_id = Column(Integer, ForeignKey("document_types.id"))
    status = Column(
        Enum(MemberDocumentStatus),
        nullable=False,
        default=MemberDocumentStatus.PENDING,
    )
    expiration_at = Column(DateTime, nullable=True)

    member = relationship("Member", back_populates="documents")
    type = relationship("DocumentType")

