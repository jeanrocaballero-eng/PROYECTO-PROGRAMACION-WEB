const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
const API = `${API_BASE}/api`;

const TOKEN_KEY = "AUTH_TOKEN";
const EMAIL_KEY = "userEmail";
const NAME_KEY = "userName";
const ID_KEY = "userId";

async function getErrorMessage(res) {
  try {
    const data = await res.json();
    return data?.detail || data?.mensaje || "Error en la solicitud";
  } catch {
    return "Error en la solicitud";
  }
}

function setSession({ token, usuario }) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  if (usuario?.email) localStorage.setItem(EMAIL_KEY, usuario.email);
  if (usuario?.nombre) localStorage.setItem(NAME_KEY, usuario.nombre);
  if (usuario?.id) localStorage.setItem(ID_KEY, usuario.id);
}

function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(EMAIL_KEY);
  localStorage.removeItem(NAME_KEY);
  localStorage.removeItem(ID_KEY);
}

function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

function isAuthenticated() {
  return !!getToken();
}

async function login(email, contraseña) {
  const res = await fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, contraseña }),
  });

  if (!res.ok) throw new Error(await getErrorMessage(res));

  const data = await res.json();
  setSession({ token: data.token, usuario: data.usuario });
  return data;
}

async function register(nombre, email, contraseña) {
  const res = await fetch(`${API}/registro`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, email, contraseña }),
  });

  if (!res.ok) throw new Error(await getErrorMessage(res));

  const data = await res.json();
  setSession({ token: data.token, usuario: data.usuario });
  return data;
}

function logout() {
  clearSession();
}

export default {
  login,
  register,
  logout,
  getToken,
  isAuthenticated,
};