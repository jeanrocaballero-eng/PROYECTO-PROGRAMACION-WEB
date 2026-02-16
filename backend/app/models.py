from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


class RegistroRequest(BaseModel):
    nombre: str
    email: EmailStr #tiene q ser @hola.com (osea q tenga @ y .com)
    contraseña: str


class LoginRequest(BaseModel):
    email: EmailStr
    contraseña: str


class RegistrarEgresoRequest(BaseModel):
    email: EmailStr
    descripcion: str
    monto: float
    categoria: str
    fecha: datetime


class EditarEgresoRequest(BaseModel):
    descripcion: Optional[str] = None
    monto: Optional[float] = None
    categoria: Optional[str] = None
    fecha: Optional[datetime] = None


class CambiarContraseñaRequest(BaseModel):
    email: EmailStr
    contraseña_actual: str
    contraseña_nueva: str


class UserResponse(BaseModel):
    id: str
    nombre: str
    email: str


class MensajeResponse(BaseModel):
    mensaje: str
    codigo: int
