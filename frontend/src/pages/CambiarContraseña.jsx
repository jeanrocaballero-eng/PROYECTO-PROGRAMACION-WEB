import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../services/authService";

export default function CambiarContraseña() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [contraseñaNueva, setContraseñaNueva] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Precargar email si vienes desde "Olvidé mi contraseña"
  useEffect(() => {
    const stateEmail = location?.state?.email;
    if (stateEmail && typeof stateEmail === "string") {
      setEmail(stateEmail);
    }
  }, [location]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMensaje("");

    const emailClean = email.trim().toLowerCase();
    const pinClean = pin.trim();

    if (!emailClean) return setError("Ingresa tu correo.");
    if (!/^\d{6}$/.test(pinClean)) return setError("El PIN debe tener 6 dígitos.");
    if (!contraseñaNueva || contraseñaNueva.length < 6) return setError("La contraseña debe tener al menos 6 caracteres.");

    try {
      setLoading(true);
      const data = await resetPassword(emailClean, pinClean, contraseñaNueva);
      setMensaje(data?.mensaje || "Contraseña actualizada correctamente.");

      // redirige a login después de un instante
      setTimeout(() => navigate("/login"), 700);
    } catch (err) {
      setError(err?.message || "Ocurrió un error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "40px auto", padding: 16 }}>
      <h2>Cambiar contraseña</h2>
      <p>Ingresa tu correo, el PIN y tu nueva contraseña.</p>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <label>
          Correo
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="correo@ejemplo.com"
            style={{ width: "100%", padding: 10, marginTop: 6 }}
            required
          />
        </label>

        <label>
          PIN (6 dígitos)
          <input
            type="text"
            inputMode="numeric"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="123456"
            style={{ width: "100%", padding: 10, marginTop: 6, letterSpacing: 2 }}
            maxLength={6}
            required
          />
        </label>

        <label>
          Nueva contraseña
          <input
            type="password"
            value={contraseñaNueva}
            onChange={(e) => setContraseñaNueva(e.target.value)}
            placeholder="******"
            style={{ width: "100%", padding: 10, marginTop: 6 }}
            required
          />
        </label>

        <button type="submit" disabled={loading} style={{ padding: 10 }}>
          {loading ? "Actualizando..." : "Actualizar contraseña"}
        </button>
      </form>

      {error ? (
        <div style={{ marginTop: 12, color: "crimson" }}>{error}</div>
      ) : null}

      {mensaje ? (
        <div style={{ marginTop: 12, color: "green" }}>{mensaje}</div>
      ) : null}

      <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
        <button type="button" onClick={() => navigate("/CorreoContraseña")} style={{ padding: 10, flex: 1 }}>
          Volver a pedir PIN
        </button>
        <button type="button" onClick={() => navigate("/LoginPage")} style={{ padding: 10, flex: 1 }}>
          Ir a Login
        </button>
      </div>
    </div>
  );
}