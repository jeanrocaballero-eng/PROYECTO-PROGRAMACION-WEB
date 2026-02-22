import os
import time
import uuid
import hashlib
import secrets
from typing import Any, Dict, Tuple, Optional

from itsdangerous import URLSafeTimedSerializer, BadSignature, SignatureExpired
from fastapi import Header, HTTPException, status, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.orm_models import Usuario

TOKEN_SALT = "egresos-auth-v1"
DEFAULT_TOKEN_MAX_AGE_SECONDS = 60 * 15
PBKDF2_ITERS = 120_000


def _secret_key() -> str:
    return os.getenv("SECRET_KEY", "dev-secret-change-me")


def _serializer() -> URLSafeTimedSerializer:
    return URLSafeTimedSerializer(_secret_key(), salt=TOKEN_SALT)

def hash_password(password: str) -> str:
    salt = secrets.token_bytes(16)
    dk = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt, PBKDF2_ITERS)
    return f"pbkdf2_sha256${PBKDF2_ITERS}${salt.hex()}${dk.hex()}"


def verify_password(password: str, stored: str) -> Tuple[bool, bool]:
    """
    Retorna: (ok, needs_upgrade)
    - Si stored está en plano (legacy), ok compara plano y needs_upgrade=True
    - Si stored está hasheado, ok valida hash y needs_upgrade=False
    """
    if stored.startswith("pbkdf2_sha256$"):
        try:
            _, iters_s, salt_hex, hash_hex = stored.split("$", 3)
            iters = int(iters_s)
            salt = bytes.fromhex(salt_hex)
            dk = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt, iters).hex()
            return secrets.compare_digest(dk, hash_hex), False
        except Exception:
            return False, False

    return secrets.compare_digest(password, stored), True


def create_access_token(payload: Dict[str, Any]) -> str:
    """
    Firma un payload (dict) y devuelve token string.
    """
    data = dict(payload)
    data["iat"] = int(time.time())
    return _serializer().dumps(data)


def decode_access_token(token: str) -> Dict[str, Any]:
    """
    Valida firma + expiración (max_age).
    """
    try:
        data = _serializer().loads(token, max_age=DEFAULT_TOKEN_MAX_AGE_SECONDS)
        if not isinstance(data, dict):
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token inválido")
        return data
    except SignatureExpired:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token expirado")
    except BadSignature:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token inválido")


def get_token_from_headers(
    authorization: str | None = Header(default=None),
    x_token: str | None = Header(default=None, alias="x-token"),
) -> str:
    """
    Acepta:
    - Authorization: Bearer <token>
    - x-token: <token>
    """
    if authorization:
        parts = authorization.split(" ", 1)
        if len(parts) == 2 and parts[0].lower() == "bearer":
            token = parts[1].strip()
            if token:
                return token

    if x_token and x_token.strip():
        return x_token.strip()

    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Falta token de autenticación")


def get_current_user(
    token: str = Depends(get_token_from_headers),
    db: Session = Depends(get_db),
) -> Usuario:
    payload = decode_access_token(token)

    user_id = payload.get("user_id")
    email = payload.get("email")

    usuario: Optional[Usuario] = None

    if user_id:
        try:
            usuario = db.query(Usuario).filter(Usuario.id == uuid.UUID(str(user_id))).first()
        except Exception:
            usuario = None

    if not usuario and email:
        usuario = db.query(Usuario).filter(Usuario.email == str(email)).first()

    if not usuario:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Usuario no válido")

    return usuario