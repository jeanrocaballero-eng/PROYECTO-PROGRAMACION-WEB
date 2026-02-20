const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
const API = `${API_BASE}/api`;

async function getErrorMessage(res) {
  try {
    const data = await res.json();
    return data?.detail || data?.mensaje || "Error en la solicitud";
  } catch {
    return "Error en la solicitud";
  }
}

function descargarBlob(blob, filename) {
  const downloadUrl = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = downloadUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();

  URL.revokeObjectURL(downloadUrl);
}

async function exportarEgresos(email, opciones) {
  const {
    formato = "csv",
    desde = "",
    hasta = "",
    incluirCategoria = true,
    incluirDescripcion = true,
    ordenDesc = false,
  } = opciones || {};

  const params = new URLSearchParams();
  params.set("formato", formato);
  if (desde) params.set("desde", desde);
  if (hasta) params.set("hasta", hasta);
  params.set("incluir_categoria", String(incluirCategoria));
  params.set("incluir_descripcion", String(incluirDescripcion));
  params.set("ordenar_desc", String(ordenDesc));

  const url = `${API}/egresos/${encodeURIComponent(email)}/export?${params.toString()}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(await getErrorMessage(res));
  }

  return res.blob();
}

export default {
  exportarEgresos,
  descargarBlob,
};