"""add presupuesto mensual to usuarios

Revision ID: 20260225_01
Revises: 20260224_01
Create Date: 2026-02-25 00:00:00

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "20260225_01"
down_revision: Union[str, Sequence[str], None] = "20260224_01"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        "usuarios",
        sa.Column("presupuesto_mensual", sa.Float(), nullable=False, server_default="0"),
    )


def downgrade() -> None:
    op.drop_column("usuarios", "presupuesto_mensual")
