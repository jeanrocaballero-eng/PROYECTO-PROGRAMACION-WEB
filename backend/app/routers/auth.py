
from fastapi import APIRouter, HTTPException, status
from app.models import RegistroRequest, LoginRequest
from app.database import users_db, generar_user_id, encontrar_usuario_por_email

router = APIRouter(
    prefix="/api",
    tags=["Autenticación"]
)


def validar_contraseña(contraseña: str) -> bool:
    
    return len(contraseña) >= 6


@router.post("/registro")
async def registrar_usuario(request: RegistroRequest):
    
    # Validar que el email no exista
    if encontrar_usuario_por_email(request.email):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El email ya está registrado"
        )

    # Validar contraseña
    if not validar_contraseña(request.contraseña):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="La contraseña debe tener al menos 6 caracteres"
        )

    # Validar nombre
    if not request.nombre or len(request.nombre.strip()) == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El nombre no puede estar vacío"
        )

    # Crear nuevo usuario
    nuevo_usuario = {
        "id": generar_user_id(),
        "nombre": request.nombre.strip(),
        "email": request.email.lower(),
        "contraseña": request.contraseña
    }

    users_db.append(nuevo_usuario)

    return {
        "mensaje": "Usuario registrado exitosamente",
        "usuario": {
            "id": nuevo_usuario["id"],
            "nombre": nuevo_usuario["nombre"],
            "email": nuevo_usuario["email"]
        }
    }


@router.post("/login")
async def login_usuario(request: LoginRequest):
  
    usuario = encontrar_usuario_por_email(request.email)

    if not usuario or usuario["contraseña"] != request.contraseña:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email o contraseña incorrectos"
        )

    return {
        "mensaje": "Inicio de sesión exitoso",
        "usuario": {
            "id": usuario["id"],
            "nombre": usuario["nombre"],
            "email": usuario["email"]
        }
    }
