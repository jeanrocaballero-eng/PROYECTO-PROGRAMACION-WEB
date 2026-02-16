
from fastapi import APIRouter, HTTPException, status
from app.models import RegistrarEgresoRequest, EditarEgresoRequest
from app.database import (
    users_db, egresos_db, generar_egreso_id,
    encontrar_usuario_por_email, encontrar_egreso_por_id
)

router = APIRouter(
    prefix="/api",
    tags=["Egresos"]
)


@router.post("/egresos")
async def registrar_egreso(request: RegistrarEgresoRequest):
    """
    Registra un nuevo egreso para un usuario autenticado
    """
    # Verificar que el usuario existe
    usuario = encontrar_usuario_por_email(request.email)
    if not usuario:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuario no encontrado"
        )

    # Validar datos
    if not request.descripcion or len(request.descripcion.strip()) == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="La descripción no puede estar vacía"
        )

    if request.monto <= 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El monto debe ser mayor a 0"
        )

    # Crear nuevo egreso
    nuevo_egreso = {
        "id": generar_egreso_id(),
        "user_id": usuario["id"],
        "descripcion": request.descripcion.strip(),
        "monto": request.monto,
        "categoria": request.categoria.strip() if request.categoria else "",
        "fecha": request.fecha
    }

    egresos_db.append(nuevo_egreso)

    return {
        "mensaje": "Egreso registrado exitosamente",
        "egreso": nuevo_egreso
    }


@router.get("/egresos/{email}")
async def obtener_egresos_usuario(email: str):
    """
    Obtiene todos los egresos de un usuario
    """
    usuario = encontrar_usuario_por_email(email)
    if not usuario:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuario no encontrado"
        )

    egresos_usuario = [e for e in egresos_db if e["user_id"] == usuario["id"]]

    return {
        "usuario": {
            "id": usuario["id"],
            "nombre": usuario["nombre"],
            "email": usuario["email"]
        },
        "egresos": egresos_usuario,
        "total": sum(e["monto"] for e in egresos_usuario)
    }


@router.put("/egresos/{id_egreso}")
async def editar_egreso(id_egreso: str, request: EditarEgresoRequest):
    """
    Edita un egreso existente (solo los campos proporcionados)
    """
    egreso = encontrar_egreso_por_id(id_egreso)

    if not egreso:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Egreso no encontrado"
        )

    # Actualizar solo los campos proporcionados
    if request.descripcion is not None:
        if len(request.descripcion.strip()) == 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="La descripción no puede estar vacía"
            )
        egreso["descripcion"] = request.descripcion.strip()

    if request.monto is not None:
        if request.monto <= 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="El monto debe ser mayor a 0"
            )
        egreso["monto"] = request.monto

    if request.categoria is not None:
        egreso["categoria"] = request.categoria.strip()

    if request.fecha is not None:
        egreso["fecha"] = request.fecha

    return {
        "mensaje": "Egreso actualizado exitosamente",
        "egreso": egreso
    }
