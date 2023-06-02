"""

Revision ID: 75e7e52f5403
Revises: 
Create Date: 2023-06-01 23:24:43.180119

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '75e7e52f5403'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('members',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('status', sa.Enum('BEFORE_SOLO_STUDENT', 'SOLO_STUDENT', 'PRIVATE_PILOT', 'CFI', name='memberstatus'), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_members_id'), 'members', ['id'], unique=False)
    op.create_table('member_documents',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('member_id', sa.Integer(), nullable=True),
    sa.Column('type', sa.Enum('STUDENT_LICENSE', 'MEDICAL', 'MEMBERSHIP_AGREEMENT', name='memberdocumenttype'), nullable=False),
    sa.Column('expiration_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['member_id'], ['members.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_member_documents_id'), 'member_documents', ['id'], unique=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_member_documents_id'), table_name='member_documents')
    op.drop_table('member_documents')
    op.drop_index(op.f('ix_members_id'), table_name='members')
    op.drop_table('members')
    op.execute("DROP TYPE memberstatus")
    op.execute("DROP TYPE memberdocumenttype")
    # ### end Alembic commands ###