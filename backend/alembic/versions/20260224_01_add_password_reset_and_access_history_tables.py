"""add password reset and access history tables

Revision ID: 20260224_01
Revises: 0f94df2d940b
Create Date: 2026-02-24 00:00:00

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


# revision identifiers, used by Alembic.
revision: str = "20260224_01"
down_revision: Union[str, Sequence[str], None] = "0f94df2d940b"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.drop_constraint(op.f("egresos_usuario_id_fkey"), "egresos", type_="foreignkey")
    op.create_foreign_key(
        op.f("egresos_usuario_id_fkey"),
        "egresos",
        "usuarios",
        ["usuario_id"],
        ["id"],
        ondelete="CASCADE",
    )

    op.create_table(
        "cambio_password",
        sa.Column("id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("user_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("pin", sa.String(length=6), nullable=False),
        sa.Column("expira_en", sa.DateTime(), nullable=False),
        sa.Column("usado_tiempo", sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(["user_id"], ["usuarios.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_cambio_password_id"), "cambio_password", ["id"], unique=False)
    op.create_index(op.f("ix_cambio_password_pin"), "cambio_password", ["pin"], unique=False)
    op.create_index(op.f("ix_cambio_password_user_id"), "cambio_password", ["user_id"], unique=False)

    op.create_table(
        "historial_acceso",
        sa.Column("id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("user_id", postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column("email_intentado", sa.String(length=100), nullable=True),
        sa.Column("creado_en", sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(["user_id"], ["usuarios.id"], ondelete="SET NULL"),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_historial_acceso_id"), "historial_acceso", ["id"], unique=False)
    op.create_index(op.f("ix_historial_acceso_user_id"), "historial_acceso", ["user_id"], unique=False)


def downgrade() -> None:
    op.drop_index(op.f("ix_historial_acceso_user_id"), table_name="historial_acceso")
    op.drop_index(op.f("ix_historial_acceso_id"), table_name="historial_acceso")
    op.drop_table("historial_acceso")

    op.drop_index(op.f("ix_cambio_password_user_id"), table_name="cambio_password")
    op.drop_index(op.f("ix_cambio_password_pin"), table_name="cambio_password")
    op.drop_index(op.f("ix_cambio_password_id"), table_name="cambio_password")
    op.drop_table("cambio_password")

    op.drop_constraint(op.f("egresos_usuario_id_fkey"), "egresos", type_="foreignkey")
    op.create_foreign_key(
        op.f("egresos_usuario_id_fkey"),
        "egresos",
        "usuarios",
        ["usuario_id"],
        ["id"],
    )
