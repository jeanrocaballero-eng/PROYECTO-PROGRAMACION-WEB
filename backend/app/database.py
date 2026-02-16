
import uuid

users_db = []

egresos_db = []


def generar_user_id() -> str:
    
    return str(uuid.uuid4())


def generar_egreso_id() -> str:
    
    return str(uuid.uuid4())


def encontrar_usuario_por_email(email: str):
    
    return next((user for user in users_db if user["email"] == email), None)


def encontrar_usuario_por_id(user_id: str):
    
    return next((user for user in users_db if user["id"] == user_id), None)


def encontrar_egreso_por_id(egreso_id: str):
    
    return next((egreso for egreso in egresos_db if egreso["id"] == egreso_id), None)
