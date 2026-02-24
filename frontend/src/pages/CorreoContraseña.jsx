import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../services/authService";

export default function CorreoContraseña() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [pin, setPin] = useState("");
  const [expiraEn, setExpiraEn] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMensaje("");
    setPin("");
    setExpiraEn("");

    const emailClean = email.trim().toLowerCase();
    if (!emailClean) {
      setError("Ingresa tu correo.");
      return;
    }

    try {
      setLoading(true);
      const data = await forgotPassword(emailClean);
      setMensaje(data?.mensaje || "Listo. Si el correo está registrado, se generó un PIN.");

      if (data?.pin) setPin(data.pin);
      if (data?.expira_en) setExpiraEn(data.expira_en);
    } catch (err) {
      setError(err?.message || "Ocurrió un error.");
    } finally {
      setLoading(false);
    }
  };

  const irAReset = () => {
    navigate("/CambiarContraseña", { state: { email: email.trim().toLowerCase() } });
  };

  return (
    <div style={{ maxWidth: 420, margin: "40px auto", padding: 16 }}>
      <h2>Olvidé mi contraseña</h2>
      <p>Ingresa tu correo para generar un PIN de restablecimiento.</p>

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

        <button type="submit" disabled={loading} style={{ padding: 10 }}>
          {loading ? "Generando..." : "Generar PIN"}
        </button>
      </form>

      {error ? (
        <div style={{ marginTop: 12, color: "crimson" }}>{error}</div>
      ) : null}

      {mensaje ? (
        <div style={{ marginTop: 12, padding: 12, border: "1px solid #ddd", borderRadius: 8 }}>
          <div style={{ marginBottom: 8 }}>{mensaje}</div>

          {pin ? (
            <div style={{ marginBottom: 8 }}>
              <strong>PIN (modo nota):</strong> <span style={{ letterSpacing: 2 }}>{pin}</span>
            </div>
          ) : null}

          {expiraEn ? (
            <div style={{ fontSize: 12, opacity: 0.8 }}>
              Expira en: {expiraEn}
            </div>
          ) : null}

          <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
            <button type="button" onClick={irAReset} style={{ padding: 10, flex: 1 }}>
              Ir a cambiar contraseña
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}