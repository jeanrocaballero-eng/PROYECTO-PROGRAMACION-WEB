from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import Session

from app.models import RegistroRequest, LoginRequest
from app.database import get_db
from app.orm_models import Usuario
from app.security import hash_password, verify_password, create_access_token
from datetime import datetime, timedelta
import secrets

from app.models import RegistroRequest, LoginRequest, ForgotPasswordRequest, ResetPasswordRequest
from app.orm_models import Usuario, CambioPassword
from app.security import hash_password

from fastapi import Request
from app.orm_models import HistorialAcceso
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
        contraseña=hash_password(request.contraseña),
        is_admin=False
    )

    db.add(nuevo_usuario)
    db.commit()
    db.refresh(nuevo_usuario)

    token = create_access_token({
        "user_id": str(nuevo_usuario.id),
        "email": nuevo_usuario.email,
        "nombre": nuevo_usuario.nombre,
        "is_admin": nuevo_usuario.is_admin
    })

    return {
        "mensaje": "Usuario registrado exitosamente",
        "token": token,
        "usuario": {
            "id": str(nuevo_usuario.id),
            "nombre": nuevo_usuario.nombre,
            "email": nuevo_usuario.email,
            "is_admin": nuevo_usuario.is_admin,
            "cantidad_egresos": 0
        }
    }


@router.post("/login")
async def login_usuario(request: Request, login: LoginRequest, db: Session = Depends(get_db)):
    """
    Autentica un usuario y devuelve token + datos.
    """
    ip = request.client.host if request.client else None
    user_agent = request.headers.get("user-agent")
    email = login.email.strip().lower()

    usuario = db.query(Usuario).filter(Usuario.email == email).first()

    if not usuario:
        db.add(HistorialAcceso(
            user_id=None,
            email_intentado=email,
            evento="LOGIN_FAIL",
            ip=ip,
            user_agent=user_agent,
            creado_en=datetime.utcnow(),
        ))
        db.commit()
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email o contraseña incorrectos"
        )

    ok, needs_upgrade = verify_password(login.contraseña, usuario.contraseña)

    if not ok:
        db.add(HistorialAcceso(
            user_id=usuario.id,
            email_intentado=email,
            evento="LOGIN_FAIL",
            ip=ip,
            user_agent=user_agent,
            creado_en=datetime.utcnow(),
        ))
        db.commit()
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email o contraseña incorrectos"
        )

    if needs_upgrade:
        usuario.contraseña = hash_password(login.contraseña)
        db.commit()
        db.refresh(usuario)

    cantidad_egresos = len(usuario.egresos)

    token = create_access_token({
        "user_id": str(usuario.id),
        "email": usuario.email,
        "nombre": usuario.nombre,
        "is_admin": usuario.is_admin
    })

    db.add(HistorialAcceso(
        user_id=usuario.id,
        email_intentado=email,
        evento="LOGIN_OK",
        ip=ip,
        user_agent=user_agent,
        creado_en=datetime.utcnow(),
    ))
    db.commit()

    return {
        "mensaje": "Inicio de sesión exitoso",
        "token": token,
        "usuario": {
            "id": str(usuario.id),
            "nombre": usuario.nombre,
            "email": usuario.email,
            "is_admin": usuario.is_admin,
            "cantidad_egresos": cantidad_egresos
        }
    }


@router.post("/forgot-password")
async def forgot_password(request: ForgotPasswordRequest, db: Session = Depends(get_db)):
    msg = {"mensaje": "Si el correo está registrado, se generó un PIN para restablecer la contraseña."}

    email = request.email.strip().lower()
    usuario = db.query(Usuario).filter(Usuario.email == email).first()

    if not usuario:
        return msg 

    ahora = datetime.utcnow()
    db.query(CambioPassword).filter(
        CambioPassword.user_id == usuario.id,
        CambioPassword.usado_tiempo.is_(None),
        CambioPassword.expira_en > ahora,
    ).delete(synchronize_session=False)

    pin = f"{secrets.randbelow(1_000_000):06d}"

    registro = CambioPassword(
        user_id=usuario.id,
        pin=pin,
        expira_en=ahora + timedelta(minutes=10),
        usado_tiempo=None,
    )
    db.add(registro)
    db.commit()

    return {**msg, "pin": pin, "expira_en": registro.expira_en.isoformat()}

@router.post("/reset-password")
async def reset_password(request: ResetPasswordRequest, db: Session = Depends(get_db)):
    email = request.email.strip().lower()
    pin = request.pin.strip()

    if not (len(pin) == 6 and pin.isdigit()):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="PIN inválido")

    if len(request.contraseña_nueva) < 5:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="La contraseña debe tener al menos 6 caracteres")

    usuario = db.query(Usuario).filter(Usuario.email == email).first()
    if not usuario:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No se pudo restablecer la contraseña")

    ahora = datetime.utcnow()

    token = db.query(CambioPassword).filter(
        CambioPassword.user_id == usuario.id,
        CambioPassword.pin == pin,
        CambioPassword.usado_tiempo.is_(None),
        CambioPassword.expira_en > ahora,
    ).first()

    if not token:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="PIN inválido o expirado")

    usuario.contraseña = hash_password(request.contraseña_nueva)

    token.usado_tiempo = ahora

    db.commit()
    return {"mensaje": "Contraseña actualizada correctamente"}