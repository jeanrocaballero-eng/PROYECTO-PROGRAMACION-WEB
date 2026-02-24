const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
const API = `${API_BASE}/api`;

function authHeaders() {
  const token = localStorage.getItem("AUTH_TOKEN");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function getUltimoAccesoUsuarios() {
  const res = await fetch(`${API_BASE}/api/admin/ultimo-acceso-usuarios`, {
    method: "GET",
    headers: authHeaders(),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.detail || "Error al cargar accesos");
  return data;
}