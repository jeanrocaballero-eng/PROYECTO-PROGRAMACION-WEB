
from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import Session
from app.models import CambiarContraseñaRequest
from app.database import get_db
from app.orm_models import Usuario

router = APIRouter(
    prefix="/api",
    tags=["Usuarios"]
)


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
    if usuario.contraseña != request.contraseña_actual:
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
    usuario.contraseña = request.contraseña_nueva
    db.commit()

    return {
        "mensaje": "Contraseña actualizada exitosamente",
        "usuario": {
            "id": usuario.id,
            "nombre": usuario.nombre,
            "email": usuario.email
        }
    }
