"""remove contraseña_visible column

Revision ID: 0f94df2d940b
Revises: ef7e6b1dddce
Create Date: 2026-02-22 15:01:26.941084

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '0f94df2d940b'
down_revision: Union[str, Sequence[str], None] = 'ef7e6b1dddce'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Eliminar la columna contraseña_visible de la tabla usuarios
    op.drop_column('usuarios', 'contraseña_visible')


def downgrade() -> None:
    # Si se hace rollback, volver a crear la columna
    op.add_column('usuarios', sa.Column('contraseña_visible', sa.String(length=255), nullable=True))
