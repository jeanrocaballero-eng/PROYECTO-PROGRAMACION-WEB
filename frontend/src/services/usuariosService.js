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

// ==========================
// LISTAR USUARIOS
// ==========================
async function listarUsuarios() {
  const res = await fetch(`${API}/usuarios`, {
    headers: { ...authHeaders() },
  });

  if (!res.ok) {
    throw new Error(await getErrorMessage(res));
  }

  return res.json();
}

// ==========================
// CREAR USUARIO
// ==========================
async function crearUsuario(payload) {
  const res = await fetch(`${API}/usuarios`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(await getErrorMessage(res));
  }

  return res.json();
}

// ==========================
// EDITAR USUARIO
// ==========================
async function actualizarUsuario(id, payload) {
  const res = await fetch(`${API}/usuarios/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(await getErrorMessage(res));
  }

  return res.json();
}

// ==========================
// ELIMINAR USUARIO
// ==========================
async function eliminarUsuario(id) {
  const res = await fetch(`${API}/usuarios/${id}`, {
    method: "DELETE",
    headers: { ...authHeaders() },
  });

  if (!res.ok) {
    throw new Error(await getErrorMessage(res));
  }

  return res.json();
}

export default {
  listarUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
};
