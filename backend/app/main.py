
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import auth, egresos, usuarios

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
