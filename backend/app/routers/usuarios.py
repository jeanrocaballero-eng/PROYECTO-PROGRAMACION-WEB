from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import Session
from app.models import CambiarContraseñaRequest
from app.database import get_db
from app.orm_models import Usuario
from app.security import verify_password, hash_password

router = APIRouter(
    prefix="/api",
    tags=["Usuarios"]
)


@router.post("/cambiar-contraseña")
async def cambiar_contraseña(request: CambiarContraseñaRequest, db: Session = Depends(get_db)):
    """
    Cambia la contraseña de un usuario utilizando su email.
    (Compatibilidad con hashing)
    """
    usuario = db.query(Usuario).filter(Usuario.email == request.email).first()

    if not usuario:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuario no encontrado"
        )

    ok, needs_upgrade = verify_password(request.contraseña_actual, usuario.contraseña)
    if not ok:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="La contraseña actual es incorrecta"
        )

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

    if needs_upgrade:
        usuario.contraseña = hash_password(request.contraseña_actual)
        db.commit()
        db.refresh(usuario)

    usuario.contraseña = hash_password(request.contraseña_nueva)
    db.commit()

    return {
        "mensaje": "Contraseña actualizada exitosamente",
        "usuario": {
            "id": str(usuario.id),
            "nombre": usuario.nombre,
            "email": usuario.email
        }
    }

from uuid import UUID
from pydantic import BaseModel

# ==========================
# SCHEMAS
# ==========================

class UsuarioCreate(BaseModel):
    nombre: str
    email: str
    contraseña: str

class UsuarioUpdate(BaseModel):
    nombre: str
    email: str


# ==========================
# LISTAR USUARIOS
# ==========================

@router.get("/usuarios")
def listar_usuarios(db: Session = Depends(get_db)):
    usuarios = db.query(Usuario).all()

    return [
        {
            "id": str(u.id),
            "nombre": u.nombre,
            "email": u.email,
            "fecha_creacion": u.fecha_creacion
        }
        for u in usuarios
    ]


# ==========================
# CREAR USUARIO
# ==========================

@router.post("/usuarios")
def crear_usuario(data: UsuarioCreate, db: Session = Depends(get_db)):

    existente = db.query(Usuario).filter(Usuario.email == data.email).first()
    if existente:
        raise HTTPException(status_code=400, detail="El email ya está registrado")

    nuevo_usuario = Usuario(
        nombre=data.nombre,
        email=data.email,
        contraseña=hash_password(data.contraseña)
    )

    db.add(nuevo_usuario)
    db.commit()
    db.refresh(nuevo_usuario)

    return {
        "mensaje": "Usuario creado correctamente",
        "usuario": {
            "id": str(nuevo_usuario.id),
            "nombre": nuevo_usuario.nombre,
            "email": nuevo_usuario.email
        }
    }


# ==========================
# EDITAR USUARIO
# ==========================

@router.put("/usuarios/{usuario_id}")
def editar_usuario(usuario_id: UUID, data: UsuarioUpdate, db: Session = Depends(get_db)):

    usuario = db.query(Usuario).filter(Usuario.id == usuario_id).first()

    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    usuario.nombre = data.nombre
    usuario.email = data.email

    db.commit()
    db.refresh(usuario)

    return {
        "mensaje": "Usuario actualizado correctamente",
        "usuario": {
            "id": str(usuario.id),
            "nombre": usuario.nombre,
            "email": usuario.email
        }
    }


# ==========================
# ELIMINAR USUARIO
# ==========================

@router.delete("/usuarios/{usuario_id}")
def eliminar_usuario(usuario_id: UUID, db: Session = Depends(get_db)):

    usuario = db.query(Usuario).filter(Usuario.id == usuario_id).first()

    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    db.delete(usuario)
    db.commit()

    return {"mensaje": "Usuario eliminado correctamente"}
