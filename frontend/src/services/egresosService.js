const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
const API = `${API_BASE}/api`;

function authHeaders() {
  const token = localStorage.getItem("AUTH_TOKEN");
  if (!token) return {};
  return {
    Authorization: `Bearer ${token}`,
    "x-token": token,
  };
}

async function getErrorMessage(res) {
  try {
    const data = await res.json();
    return data?.detail || data?.mensaje || "Error en la solicitud";
  } catch {
    return "Error en la solicitud";
  }
}

async function listarPorEmail(email) {
  const res = await fetch(`${API}/egresos/${encodeURIComponent(email)}`, {
    headers: { ...authHeaders() },
  });

  if (!res.ok) {
    throw new Error(await getErrorMessage(res));
  }

  return res.json();
}

async function crearEgreso(payload) {
  const res = await fetch(`${API}/egresos`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(await getErrorMessage(res));
  }

  return res.json();
}

async function actualizarEgreso(id, payload) {
  const res = await fetch(`${API}/egresos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(await getErrorMessage(res));
  }

  return res.json();
}

async function eliminarEgreso(id) {
  const res = await fetch(`${API}/egresos/${id}`, {
    method: "DELETE",
    headers: { ...authHeaders() },
  });

  if (!res.ok) {
    throw new Error(await getErrorMessage(res));
  }

  return res.json();
}

export async function misEgresosPorDia(ordenar_desc = true) {
  const res = await fetch(`${API_BASE}/api/egresos/mis_egresos?ordenar_desc=${ordenar_desc}`, {
    method: "GET",
    headers: authHeaders(),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.detail || "Error al cargar egresos");
  return data; // { items: [...] }
}
export default {
  listarPorEmail,
  crearEgreso,
  actualizarEgreso,
  eliminarEgreso,
  misEgresosPorDia
};