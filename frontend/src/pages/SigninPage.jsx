import Cabecera_para_formularios from "../components/Cabecera_registro";
import Formulario_registro from "../components/Formulario_registro";
import Mensaje from "../components/Mensaje";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import authService from "../services/authService";

function SigninPage() {
  const navigate = useNavigate();
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [mensajeError, setMensajeError] = useState("Debe completar todos los campos");

  async function signin(nombre, email, contraseña) {
    if (!nombre || !email || !contraseña) {
      setMensajeError("Debe completar todos los campos");
      setMostrarMensaje(true);
      setTimeout(() => setMostrarMensaje(false), 3000);
      return;
    }

    try {
      await authService.register(nombre, email, contraseña);
      navigate("/LobbyUSER");
    } catch (error) {
      setMensajeError(error.message || "Error al registrar usuario");
      setMostrarMensaje(true);
      setTimeout(() => setMostrarMensaje(false), 3000);
    }
  }

  return (
    <div className="min-h-screen">
      <Cabecera_para_formularios />

      <div className="flex justify-center mt-8 sm:mt-12 md:mt-16 lg:mt-20 px-4 sm:px-6">
        <div className="border border-gray-300 grid gap-3 sm:gap-4 grid-cols-1 p-4 sm:p-6 md:p-8 w-full max-w-sm md:max-w-md items-center">
          <Formulario_registro onRegistro={signin} />
          <Mensaje msg={mensajeError} visible={mostrarMensaje} />
        </div>
      </div>
    </div>
  );
}

export default SigninPage;