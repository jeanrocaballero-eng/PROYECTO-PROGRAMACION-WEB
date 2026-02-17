# Este archivo se mantiene para compatibilidad si es necesario
from app.database import engine, Base, get_db

__all__ = ["engine", "Base", "get_db"]
