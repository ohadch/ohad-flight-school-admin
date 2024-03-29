"""renames instruction plans to courses

Revision ID: 021774e2806f
Revises: 6155d117114b
Create Date: 2023-06-02 22:52:52.623400

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "021774e2806f"
down_revision = "6155d117114b"
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "courses",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_courses_id"), "courses", ["id"], unique=False)
    op.create_table(
        "course_syllabuses",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("course_id", sa.Integer(), nullable=True),
        sa.Column("syllabus_id", sa.Integer(), nullable=True),
        sa.ForeignKeyConstraint(
            ["course_id"],
            ["courses.id"],
        ),
        sa.ForeignKeyConstraint(
            ["syllabus_id"],
            ["syllabuses.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint(
            "course_id", "syllabus_id", name="course_syllabus_course_id_syllabus_id_uc"
        ),
    )
    op.create_index(
        op.f("ix_course_syllabuses_id"), "course_syllabuses", ["id"], unique=False
    )
    op.drop_index(
        "ix_instruction_plan_syllabuses_id", table_name="instruction_plan_syllabuses"
    )
    op.drop_table("instruction_plan_syllabuses")
    op.drop_index("ix_instruction_plans_id", table_name="instruction_plans")
    op.drop_table("instruction_plans")
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "instruction_plans",
        sa.Column(
            "id",
            sa.INTEGER(),
            server_default=sa.text("nextval('instruction_plans_id_seq'::regclass)"),
            autoincrement=True,
            nullable=False,
        ),
        sa.Column("name", sa.VARCHAR(), autoincrement=False, nullable=False),
        sa.PrimaryKeyConstraint("id", name="instruction_plans_pkey"),
        postgresql_ignore_search_path=False,
    )
    op.create_index(
        "ix_instruction_plans_id", "instruction_plans", ["id"], unique=False
    )
    op.create_table(
        "instruction_plan_syllabuses",
        sa.Column("id", sa.INTEGER(), autoincrement=True, nullable=False),
        sa.Column(
            "instruction_plan_id", sa.INTEGER(), autoincrement=False, nullable=True
        ),
        sa.Column("syllabus_id", sa.INTEGER(), autoincrement=False, nullable=True),
        sa.ForeignKeyConstraint(
            ["instruction_plan_id"],
            ["instruction_plans.id"],
            name="instruction_plan_syllabuses_instruction_plan_id_fkey",
        ),
        sa.ForeignKeyConstraint(
            ["syllabus_id"],
            ["syllabuses.id"],
            name="instruction_plan_syllabuses_syllabus_id_fkey",
        ),
        sa.PrimaryKeyConstraint("id", name="instruction_plan_syllabuses_pkey"),
        sa.UniqueConstraint(
            "instruction_plan_id",
            "syllabus_id",
            name="instruction_plan_syllabus_instruction_plan_id_syllabus_id_uc",
        ),
    )
    op.create_index(
        "ix_instruction_plan_syllabuses_id",
        "instruction_plan_syllabuses",
        ["id"],
        unique=False,
    )
    op.drop_index(op.f("ix_course_syllabuses_id"), table_name="course_syllabuses")
    op.drop_table("course_syllabuses")
    op.drop_index(op.f("ix_courses_id"), table_name="courses")
    op.drop_table("courses")
    # ### end Alembic commands ###
