from fastapi import APIRouter, HTTPException, status, Depends, Query
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from app.models import RegistrarEgresoRequest, EditarEgresoRequest
from app.database import get_db
from app.orm_models import Usuario, Egreso
from datetime import datetime, timedelta
import io
import csv

from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet

from app.security import get_current_user

router = APIRouter(
    prefix="/api",
    tags=["Egresos"]
)


@router.post("/egresos")
async def registrar_egreso(
    request: RegistrarEgresoRequest,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user),
):
    """
    Registra un nuevo egreso para el usuario autenticado.
    (Se valida que request.email sea el mismo del token)
    """
    if request.email != current_user.email:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No puedes registrar egresos para otro usuario"
        )

    if not request.descripcion or len(request.descripcion.strip()) == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="La descripción no puede estar vacía"
        )

    if request.monto <= 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El monto debe ser mayor a 0"
        )

    nuevo_egreso = Egreso(
        usuario_id=current_user.id,
        descripcion=request.descripcion.strip(),
        monto=request.monto,
        categoria=request.categoria.strip() if request.categoria else "",
        fecha=datetime.fromisoformat(request.fecha) if isinstance(request.fecha, str) else request.fecha
    )

    db.add(nuevo_egreso)
    db.commit()
    db.refresh(nuevo_egreso)

    return {
        "mensaje": "Egreso registrado exitosamente",
        "egreso": {
            "id": str(nuevo_egreso.id),
            "usuario_id": str(nuevo_egreso.usuario_id),
            "descripcion": nuevo_egreso.descripcion,
            "monto": nuevo_egreso.monto,
            "categoria": nuevo_egreso.categoria,
            "fecha": nuevo_egreso.fecha.isoformat()
        }
    }


@router.get("/egresos/{email}")
async def obtener_egresos_usuario(
    email: str,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user),
):
    """
    Obtiene todos los egresos del usuario autenticado.
    """
    if email != current_user.email:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No puedes ver egresos de otro usuario"
        )

    egresos_usuario = db.query(Egreso).filter(Egreso.usuario_id == current_user.id).all()

    return {
        "usuario": {
            "id": str(current_user.id),
            "nombre": current_user.nombre,
            "email": current_user.email
        },
        "egresos": [
            {
                "id": str(e.id),
                "descripcion": e.descripcion,
                "monto": e.monto,
                "categoria": e.categoria,
                "fecha": e.fecha.isoformat() if e.fecha else None
            }
            for e in egresos_usuario
        ],
        "total": float(sum(e.monto for e in egresos_usuario))
    }


@router.put("/egresos/{id_egreso}")
async def editar_egreso(
    id_egreso: str,
    request: EditarEgresoRequest,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user),
):
    """
    Edita un egreso existente del usuario autenticado.
    """
    egreso = db.query(Egreso).filter(Egreso.id == id_egreso).first()
    if not egreso:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Egreso no encontrado")

    if str(egreso.usuario_id) != str(current_user.id):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="No puedes editar egresos de otro usuario")

    if request.descripcion is not None:
        if len(request.descripcion.strip()) == 0:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="La descripción no puede estar vacía")
        egreso.descripcion = request.descripcion.strip()

    if request.monto is not None:
        if request.monto <= 0:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="El monto debe ser mayor a 0")
        egreso.monto = request.monto

    if request.categoria is not None:
        egreso.categoria = request.categoria.strip() if request.categoria else ""

    if request.fecha is not None:
        egreso.fecha = datetime.fromisoformat(request.fecha) if isinstance(request.fecha, str) else request.fecha

    db.commit()
    db.refresh(egreso)

    return {
        "mensaje": "Egreso actualizado exitosamente",
        "egreso": {
            "id": str(egreso.id),
            "descripcion": egreso.descripcion,
            "monto": egreso.monto,
            "categoria": egreso.categoria,
            "fecha": egreso.fecha.isoformat()
        }
    }


@router.delete("/egresos/{id_egreso}")
async def eliminar_egreso(
    id_egreso: str,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user),
):
    """
    Elimina un egreso del usuario autenticado.
    """
    egreso = db.query(Egreso).filter(Egreso.id == id_egreso).first()
    if not egreso:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Egreso no encontrado")

    if str(egreso.usuario_id) != str(current_user.id):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="No puedes eliminar egresos de otro usuario")

    db.delete(egreso)
    db.commit()

    return {"mensaje": "Egreso eliminado exitosamente", "id": id_egreso}


@router.get("/egresos/{email}/export")
async def exportar_egresos(
    email: str,
    formato: str = Query("csv", description="csv o pdf"),
    desde: str | None = Query(None, description="YYYY-MM-DD"),
    hasta: str | None = Query(None, description="YYYY-MM-DD"),
    incluir_categoria: bool = Query(True),
    incluir_descripcion: bool = Query(True),
    ordenar_desc: bool = Query(False),
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user),
):
    """
    Exporta egresos del usuario autenticado.
    """
    if email != current_user.email:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="No puedes exportar egresos de otro usuario")

    q = db.query(Egreso).filter(Egreso.usuario_id == current_user.id)

    if desde:
        desde_dt = datetime.fromisoformat(desde)
        q = q.filter(Egreso.fecha >= desde_dt)

    if hasta:
        hasta_dt = datetime.fromisoformat(hasta) + timedelta(days=1) - timedelta(microseconds=1)
        q = q.filter(Egreso.fecha <= hasta_dt)

    q = q.order_by(Egreso.fecha.desc() if ordenar_desc else Egreso.fecha.asc())

    egresos = q.all()

    formato = formato.lower().strip()
    if formato not in ["csv", "pdf"]:
        raise HTTPException(status_code=400, detail="Formato inválido. Use csv o pdf.")

    filename = f"egresos_{current_user.email}.{formato}"

    if formato == "csv":
        output = io.StringIO()
        writer = csv.writer(output)

        columnas = ["fecha", "monto"]
        if incluir_categoria:
            columnas.append("categoria")
        if incluir_descripcion:
            columnas.append("descripcion")

        writer.writerow(columnas)

        for e in egresos:
            row = [
                e.fecha.date().isoformat() if e.fecha else "",
                float(e.monto),
            ]
            if incluir_categoria:
                row.append(e.categoria or "")
            if incluir_descripcion:
                row.append(e.descripcion or "")
            writer.writerow(row)

        output.seek(0)
        return StreamingResponse(
            io.BytesIO(output.getvalue().encode("utf-8")),
            media_type="text/csv; charset=utf-8",
            headers={"Content-Disposition": f'attachment; filename="{filename}"'}
        )

    buffer = io.BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=letter)
    styles = getSampleStyleSheet()
    story = []

    story.append(Paragraph("Reporte de Egresos", styles["Title"]))
    story.append(Paragraph(f"Usuario: {current_user.nombre} ({current_user.email})", styles["Normal"]))
    story.append(Spacer(1, 12))

    cols = ["Fecha", "Monto (S/.)"]
    if incluir_categoria:
        cols.append("Categoría")
    if incluir_descripcion:
        cols.append("Descripción")

    data = [cols]
    total = 0.0

    for e in egresos:
        total += float(e.monto)
        row = [
            e.fecha.date().isoformat() if e.fecha else "",
            f"{float(e.monto):.2f}",
        ]
        if incluir_categoria:
            row.append(e.categoria or "")
        if incluir_descripcion:
            row.append(e.descripcion or "")
        data.append(row)

    story.append(Paragraph(f"Total: S/ {total:.2f}", styles["Heading3"]))
    story.append(Spacer(1, 10))

    table = Table(data, hAlign="LEFT")
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), colors.lightgrey),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("GRID", (0, 0), (-1, -1), 0.5, colors.grey),
        ("FONTSIZE", (0, 0), (-1, -1), 9),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.whitesmoke, colors.white]),
    ]))

    story.append(table)
    doc.build(story)

    buffer.seek(0)
    return StreamingResponse(
        buffer,
        media_type="application/pdf",
        headers={"Content-Disposition": f'attachment; filename="{filename}"'}
    )