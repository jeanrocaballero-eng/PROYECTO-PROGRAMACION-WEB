import Cabecera_para_formularios from "../components/Cabecera_registro";
import Mensaje from "../components/Mensaje";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

function LoginPage() {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [mostrarContraseña, setMostrarContraseña] = useState(false);
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [mensajeError, setMensajeError] = useState("Datos incorrectos");

  useEffect(() => {
    if (authService.isAuthenticated()) {
      navigate("/LobbyUSER");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!correo || !contraseña) {
      setMensajeError("Debe completar todos los campos");
      setMostrarMensaje(true);
      setTimeout(() => setMostrarMensaje(false), 3000);
      return;
    }
    if (!correo.includes("@")) {
        setMensajeError("No es un correo válido");
        setMostrarMensaje(true);
        setTimeout(() => setMostrarMensaje(false), 3000);
        return;
    }

    try {
      await authService.login(correo, contraseña);
      navigate("/LobbyUSER");
      setCorreo("");
      setContraseña("");
      setMostrarMensaje(false);
    } catch (error) {
      setMensajeError(error.message || "Datos incorrectos");
      setMostrarMensaje(true);
      setTimeout(() => setMostrarMensaje(false), 3000);
    }
  };

  return (
    <div>
      <Cabecera_para_formularios />

      <div className="flex justify-center mt-20 px-4">
        <div className="border border-gray-300 grid gap-4 grid-cols-1 p-4 w-full max-w-sm items-center">
          <h1 className="font-bold text-2xl text-center">Iniciar Sesión</h1>
          <p>Ingresa con tu correo y contraseña</p>

          <form onSubmit={handleLogin}>
            <div>
              <div>Correo Electrónico</div>
              <input
                className="w-full mt-1 border-2 py-3 rounded border-gray-300 placeholder:text-gray-400 px-4 text-md"
                placeholder="Ingresa tu correo electrónico"
                type="text"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />

              <div className="mt-4">Contraseña</div>
              <div className="relative">
                <input
                  className="w-full mt-1 border-2 py-3 rounded border-gray-300 placeholder:text-gray-400 px-4 text-md"
                  placeholder="Ingresa tu contraseña"
                  type={mostrarContraseña ? "text" : "password"}
                  value={contraseña}
                  onChange={(e) => setContraseña(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setMostrarContraseña(!mostrarContraseña)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 mt-1"
                >
                  <img
                    src={mostrarContraseña ? "/imagenes/visto.png" : "/imagenes/no_visto.png"}
                    alt={mostrarContraseña ? "Ocultar" : "Mostrar"}
                    className="w-5 h-5"
                  />
                </button>
              </div>

              <div className="mt-3 text-right">
                <button
                  type="button"
                  onClick={() => navigate("/CorreoContraseña")}
                  className="text-sm text-gray-600 hover:text-black transition hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
            </div>

            <Mensaje msg={mensajeError} visible={mostrarMensaje} />

            <button
              type="submit"
              className="bg-black text-white p-2 rounded-3xl font-bold text-sm mb-2 hover:bg-gray-800 transition text-center w-full mt-3"
            >
              INICIAR SESIÓN
            </button>
          </form>

          <p className="text-sm text-center text-gray-600">
            ¿No tienes una cuenta?{" "}
            <button
              type="button"
              onClick={() => navigate("/SigninPage")}
              className="font-semibold text-black hover:underline bg-none border-none cursor-pointer"
            >
              Regístrate
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;