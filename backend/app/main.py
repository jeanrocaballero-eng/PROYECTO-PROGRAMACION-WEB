
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import auth, egresos, usuarios
from app.database import engine, Base
from app.orm_models import Usuario, Egreso


# Crear las tablas en la BD si no existen
Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(egresos.router)
app.include_router(usuarios.router)


@app.get("/")
async def root():
    return {"mensaje": "Backend de gestión de egresos corriendo correctamente"}
