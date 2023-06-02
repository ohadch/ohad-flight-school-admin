from sqlalchemy import UniqueConstraint, Column, Integer, ForeignKey
from sqlalchemy.orm import relationship

from src.config.database import Base


class InstructionPlanSyllabus(Base):

    __tablename__ = "instruction_plan_syllabuses"

    id = Column(Integer, primary_key=True, index=True)
    instruction_plan_id = Column(
        Integer,
        ForeignKey("instruction_plans.id"),
    )
    syllabus_id = Column(
        Integer,
        ForeignKey("syllabuses.id"),
    )

    __table_args__ = (
        UniqueConstraint(
            "instruction_plan_id",
            "syllabus_id",
            name="instruction_plan_syllabus_instruction_plan_id_syllabus_id_uc",
        ),
    )

    instruction_plan = relationship("InstructionPlan")
    syllabus = relationship("Syllabus")
