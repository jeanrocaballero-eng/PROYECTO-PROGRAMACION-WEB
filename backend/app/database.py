from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# URL por entorno para facilitar despliegue en nube.
# Si no existe DATABASE_URL, usa la configuración local por defecto.
SQLALCHEMY_DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://egresos:egresos@127.0.0.1:5432/egresos_db",
)

engine = create_engine(SQLALCHEMY_DATABASE_URL)
session = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# PARA ACCEDER A LA BASE DE DATOS
def get_db():
    db = session()
    try:
        yield db
    finally:
        db.close()
