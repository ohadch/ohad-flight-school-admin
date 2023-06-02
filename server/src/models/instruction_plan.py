from sqlalchemy import Column, Integer, String

from src.config.database import Base


class InstructionPlan(Base):
    __tablename__ = "instruction_plans"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
