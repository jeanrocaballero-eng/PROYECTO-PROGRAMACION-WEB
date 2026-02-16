
from pydantic import BaseModel, EmailStr
from typing import Optional


class RegistroRequest(BaseModel):
    nombre: str
    email: EmailStr
    contraseña: str


class LoginRequest(BaseModel):
    email: EmailStr
    contraseña: str


class RegistrarEgresoRequest(BaseModel):
    email: EmailStr
    descripcion: str
    monto: float
    categoria: str
    fecha: str


class EditarEgresoRequest(BaseModel):
    descripcion: Optional[str] = None
    monto: Optional[float] = None
    categoria: Optional[str] = None
    fecha: Optional[str] = None


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
