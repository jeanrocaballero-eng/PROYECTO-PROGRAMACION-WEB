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

async function listarPorEmail(email) {
  const res = await fetch(`${API}/egresos/${encodeURIComponent(email)}`);

  if (!res.ok) {
    throw new Error(await getErrorMessage(res));
  }

  return res.json();
}

async function crearEgreso(payload) {
  const res = await fetch(`${API}/egresos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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
    headers: { "Content-Type": "application/json" },
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
  });

  if (!res.ok) {
    throw new Error(await getErrorMessage(res));
  }

  return res.json();
}

export default {
  listarPorEmail,
  crearEgreso,
  actualizarEgreso,
  eliminarEgreso,
};