
from fastapi import APIRouter, HTTPException, status
from app.models import CambiarContraseñaRequest
from app.database import users_db, encontrar_usuario_por_email

router = APIRouter(
    prefix="/api",
    tags=["Usuarios"]
)


def validar_contraseña(contraseña: str) -> bool:
    """Valida que la contraseña tenga una longitud mínima de 6 caracteres"""
    return len(contraseña) >= 6


@router.post("/cambiar-contraseña")
async def cambiar_contraseña(request: CambiarContraseñaRequest):
    """
    Cambia la contraseña de un usuario autenticado
    """
    usuario = encontrar_usuario_por_email(request.email)

    if not usuario:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuario no encontrado"
        )

    # Verificar contraseña actual
    if usuario["contraseña"] != request.contraseña_actual:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="La contraseña actual es incorrecta"
        )

    # Validar nueva contraseña
    if not validar_contraseña(request.contraseña_nueva):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="La nueva contraseña debe tener al menos 6 caracteres"
        )

    if request.contraseña_actual == request.contraseña_nueva:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="La nueva contraseña no puede ser igual a la anterior"
        )

    # Actualizar contraseña
    usuario["contraseña"] = request.contraseña_nueva

    return {
        "mensaje": "Contraseña actualizada exitosamente",
        "usuario": {
            "id": usuario["id"],
            "nombre": usuario["nombre"],
            "email": usuario["email"]
        }
    }
