from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

#en este caso el usuario es egresos, y la contraseña es egresos, y la base de datos se llama egresos_db
#Cambiar esos campos si es necesario(Añadido) y se puede cambiar 127.0.0.1 por localhost, funcionará.
SQLALCHEMY_DATABASE_URL = "postgresql://egresos:egresos@127.0.0.1:5432/egresos_db"

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
