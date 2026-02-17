
from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import Session
from app.models import RegistroRequest, LoginRequest
from app.config import get_db
from app.orm_models import Usuario
import hashlib

router = APIRouter(
    prefix="/api",
    tags=["Autenticación"]
)


def hash_password(password: str) -> str:
    """Hash de contraseña con SHA256"""
    return hashlib.sha256(password.encode()).hexdigest()


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verifica que la contraseña coincida con el hash"""
    return hash_password(plain_password) == hashed_password


@router.post("/registro")
async def registrar_usuario(request: RegistroRequest, db: Session = Depends(get_db)):
    """
    Registra un nuevo usuario en la BD
    """
    # Validar que el email no esté registrado
    usuario_existente = db.query(Usuario).filter(Usuario.email == request.email).first()
    if usuario_existente:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El email ya está registrado"
        )

    # Validar que la contraseña tenga al menos 6 caracteres
    if len(request.contraseña) < 6:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="La contraseña debe tener al menos 6 caracteres"
        )

    # Validar nombre no vacío
    if not request.nombre or len(request.nombre.strip()) == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El nombre no puede estar vacío"
        )

    # Crear nuevo usuario
    nuevo_usuario = Usuario(
        nombre=request.nombre.strip(),
        email=request.email,
        contraseña=hash_password(request.contraseña)
    )

    db.add(nuevo_usuario)
    db.commit()
    db.refresh(nuevo_usuario)

    return {
        "mensaje": "Usuario registrado exitosamente",
        "usuario": {
            "id": nuevo_usuario.id,
            "nombre": nuevo_usuario.nombre,
            "email": nuevo_usuario.email
        }
    }


@router.post("/login")
async def login_usuario(request: LoginRequest, db: Session = Depends(get_db)):
    """
    Autentica un usuario y devuelve sus datos
    """
    # Buscar usuario por email
    usuario = db.query(Usuario).filter(Usuario.email == request.email).first()

    if not usuario or not verify_password(request.contraseña, usuario.contraseña):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email o contraseña incorrectos"
        )

    # Contar egresos del usuario
    cantidad_egresos = len(usuario.egresos)

    return {
        "mensaje": "Inicio de sesión exitoso",
        "usuario": {
            "id": usuario.id,
            "nombre": usuario.nombre,
            "email": usuario.email,
            "cantidad_egresos": cantidad_egresos
        }
    }
