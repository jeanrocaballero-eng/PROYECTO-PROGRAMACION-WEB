from sqlalchemy import Column, String, Float, DateTime, ForeignKey, Boolean
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid
from app.database import Base


class Usuario(Base):
    """Modelo de Usuario en la BD"""
    __tablename__ = "usuarios"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    nombre = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False, index=True)
    contraseña = Column(String(255), nullable=False)
    is_admin = Column(Boolean, default=False, nullable=False)
    fecha_creacion = Column(DateTime, default=datetime.utcnow)

    # Relación: Un usuario tiene muchos egresos
    egresos = relationship("Egreso", back_populates="usuario", cascade="all, delete-orphan")


class Egreso(Base):
    """Modelo de Egreso en la BD"""
    __tablename__ = "egresos"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    usuario_id = Column(UUID(as_uuid=True), ForeignKey("usuarios.id"), nullable=False)
    descripcion = Column(String(200), nullable=False)
    monto = Column(Float, nullable=False)
    categoria = Column(String(50), nullable=True)
    fecha = Column(DateTime, default=datetime.utcnow)

    # Relación: Cada egreso pertenece a un usuario
    usuario = relationship("Usuario", back_populates="egresos")
