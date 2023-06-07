from sqlalchemy import Column, Integer, String, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship

from src.config.database import Base


class SyllabusItem(Base):

    __tablename__ = "syllabus_items"
    __table_args__ = (
        UniqueConstraint(
            "syllabus_id",
            "name",
            name="syllabus_item_syllabus_id_name_unique_constraint",
        ),
    )

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    syllabus_id = Column(
        Integer,
        ForeignKey("syllabuses.id"),
        nullable=False,
    )

    syllabus = relationship("Syllabus", back_populates="items")
    demonstrations = relationship("Demonstration", back_populates="syllabus_item")
