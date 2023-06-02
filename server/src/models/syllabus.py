from sqlalchemy import Column, Integer, String

from src.config.database import Base


class Syllabus(Base):

    __tablename__ = "syllabuses"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
