from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import Session

from app.models import RegistroRequest, LoginRequest
from app.database import get_db
from app.orm_models import Usuario
from app.security import hash_password, verify_password, create_access_token

router = APIRouter(
    prefix="/api",
    tags=["Autenticación"]
)


@router.post("/registro")
async def registrar_usuario(request: RegistroRequest, db: Session = Depends(get_db)):
    """
    Registra un nuevo usuario en la BD y devuelve token (auto-login).
    """
    usuario_existente = db.query(Usuario).filter(Usuario.email == request.email).first()
    if usuario_existente:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El email ya está registrado"
        )

    if len(request.contraseña) < 6:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="La contraseña debe tener al menos 6 caracteres"
        )

    if not request.nombre or len(request.nombre.strip()) == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El nombre no puede estar vacío"
        )

    nuevo_usuario = Usuario(
        nombre=request.nombre.strip(),
        email=request.email,
        contraseña=hash_password(request.contraseña)
    )

    db.add(nuevo_usuario)
    db.commit()
    db.refresh(nuevo_usuario)

    token = create_access_token({
        "user_id": str(nuevo_usuario.id),
        "email": nuevo_usuario.email,
        "nombre": nuevo_usuario.nombre
    })

    return {
        "mensaje": "Usuario registrado exitosamente",
        "token": token,
        "usuario": {
            "id": str(nuevo_usuario.id),
            "nombre": nuevo_usuario.nombre,
            "email": nuevo_usuario.email,
            "cantidad_egresos": 0
        }
    }


@router.post("/login")
async def login_usuario(request: LoginRequest, db: Session = Depends(get_db)):
    """
    Autentica un usuario y devuelve token + datos.
    """
    usuario = db.query(Usuario).filter(Usuario.email == request.email).first()

    if not usuario:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email o contraseña incorrectos"
        )

    ok, needs_upgrade = verify_password(request.contraseña, usuario.contraseña)
    if not ok:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email o contraseña incorrectos"
        )

    if needs_upgrade:
        usuario.contraseña = hash_password(request.contraseña)
        db.commit()
        db.refresh(usuario)

    cantidad_egresos = len(usuario.egresos)

    token = create_access_token({
        "user_id": str(usuario.id),
        "email": usuario.email,
        "nombre": usuario.nombre
    })

    return {
        "mensaje": "Inicio de sesión exitoso",
        "token": token,
        "usuario": {
            "id": str(usuario.id),
            "nombre": usuario.nombre,
            "email": usuario.email,
            "cantidad_egresos": cantidad_egresos
        }
    }