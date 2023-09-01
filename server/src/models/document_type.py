from sqlalchemy import Column, Integer, String

from src.config.database import Base


class DocumentType(Base):

    __tablename__ = "document_types"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, unique=True)
