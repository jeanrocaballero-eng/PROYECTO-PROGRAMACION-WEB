
from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import Session
from app.models import CambiarContraseñaRequest
from app.config import get_db
from app.orm_models import Usuario
import hashlib

router = APIRouter(
    prefix="/api",
    tags=["Usuarios"]
)


def hash_password(password: str) -> str:
    """Hash de contraseña con SHA256"""
    return hashlib.sha256(password.encode()).hexdigest()


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verifica que la contraseña coincida con el hash"""
    return hash_password(plain_password) == hashed_password


@router.post("/cambiar-contraseña")
async def cambiar_contraseña(request: CambiarContraseñaRequest, db: Session = Depends(get_db)):
    """
    Cambia la contraseña de un usuario utilizando su email
    """
    usuario = db.query(Usuario).filter(Usuario.email == request.email).first()

    if not usuario:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuario no encontrado"
        )

    # Verificar contraseña actual
    if not verify_password(request.contraseña_actual, usuario.contraseña):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="La contraseña actual es incorrecta"
        )

    # Validar nueva contraseña
    if len(request.contraseña_nueva) < 6:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="La nueva contraseña debe tener al menos 6 caracteres"
        )

    if request.contraseña_actual == request.contraseña_nueva:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="La nueva contraseña no puede ser igual a la anterior"
        )

    # Actualizar contraseña en la BD
    usuario.contraseña = hash_password(request.contraseña_nueva)
    db.commit()

    return {
        "mensaje": "Contraseña actualizada exitosamente",
        "usuario": {
            "id": usuario.id,
            "nombre": usuario.nombre,
            "email": usuario.email
        }
    }
