
from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import Session
from app.models import RegistrarEgresoRequest, EditarEgresoRequest
from app.config import get_db
from app.orm_models import Usuario, Egreso
from datetime import datetime

router = APIRouter(
    prefix="/api",
    tags=["Egresos"]
)


@router.post("/egresos")
async def registrar_egreso(request: RegistrarEgresoRequest, db: Session = Depends(get_db)):
    """
    Registra un nuevo egreso para un usuario
    """
    # Verificar que el usuario existe
    usuario = db.query(Usuario).filter(Usuario.email == request.email).first()
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
    nuevo_egreso = Egreso(
        usuario_id=usuario.id,
        descripcion=request.descripcion.strip(),
        monto=request.monto,
        categoria=request.categoria.strip() if request.categoria else "",
        fecha=datetime.fromisoformat(request.fecha) if isinstance(request.fecha, str) else request.fecha
    )

    db.add(nuevo_egreso)
    db.commit()
    db.refresh(nuevo_egreso)

    return {
        "mensaje": "Egreso registrado exitosamente",
        "egreso": {
            "id": nuevo_egreso.id,
            "usuario_id": nuevo_egreso.usuario_id,
            "descripcion": nuevo_egreso.descripcion,
            "monto": nuevo_egreso.monto,
            "categoria": nuevo_egreso.categoria,
            "fecha": nuevo_egreso.fecha.isoformat()
        }
    }


@router.get("/egresos/{email}")
async def obtener_egresos_usuario(email: str, db: Session = Depends(get_db)):
    """
    Obtiene todos los egresos de un usuario
    """
    usuario = db.query(Usuario).filter(Usuario.email == email).first()
    if not usuario:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuario no encontrado"
        )

    egresos_usuario = db.query(Egreso).filter(Egreso.usuario_id == usuario.id).all()

    return {
        "usuario": {
            "id": usuario.id,
            "nombre": usuario.nombre,
            "email": usuario.email
        },
        "egresos": [
            {
                "id": e.id,
                "descripcion": e.descripcion,
                "monto": e.monto,
                "categoria": e.categoria,
                "fecha": e.fecha.isoformat() if e.fecha else None
            }
            for e in egresos_usuario
        ],
        "total": sum(e.monto for e in egresos_usuario)
    }


@router.put("/egresos/{id_egreso}")
async def editar_egreso(id_egreso: int, request: EditarEgresoRequest, db: Session = Depends(get_db)):
    """
    Edita un egreso existente
    """
    egreso = db.query(Egreso).filter(Egreso.id == id_egreso).first()

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
        egreso.descripcion = request.descripcion.strip()

    if request.monto is not None:
        if request.monto <= 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="El monto debe ser mayor a 0"
            )
        egreso.monto = request.monto

    if request.categoria is not None:
        egreso.categoria = request.categoria.strip() if request.categoria else ""

    if request.fecha is not None:
        egreso.fecha = datetime.fromisoformat(request.fecha) if isinstance(request.fecha, str) else request.fecha

    db.commit()
    db.refresh(egreso)

    return {
        "mensaje": "Egreso actualizado exitosamente",
        "egreso": {
            "id": egreso.id,
            "descripcion": egreso.descripcion,
            "monto": egreso.monto,
            "categoria": egreso.categoria,
            "fecha": egreso.fecha.isoformat()
        }
    }
