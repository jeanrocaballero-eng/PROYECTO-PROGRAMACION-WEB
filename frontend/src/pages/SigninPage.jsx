import Cabecera_para_formularios from "../components/Cabecera_registro";
import Formulario_registro from "../components/Formulario_registro";
import Mensaje from "../components/Mensaje";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


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
      const response = await fetch('http://localhost:8000/api/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: nombre,
          email: email,
          contraseña: contraseña
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Guardar email del usuario en localStorage
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userName', nombre);
        navigate("/LobbyUSER");
      } else {
        // Extraer mensaje de error de forma segura
        let mensaje = "Error al registrar usuario";
        if (data.detail) {
          mensaje = typeof data.detail === 'string' ? data.detail : JSON.stringify(data.detail);
        }
        setMensajeError(mensaje);
        setMostrarMensaje(true);
        setTimeout(() => setMostrarMensaje(false), 3000);
        console.error('Error de registro:', data);
      }
    } catch (error) {
      console.error('Error:', error);
      setMensajeError("Error de conexión con el servidor");
      setMostrarMensaje(true);
      setTimeout(() => setMostrarMensaje(false), 3000);
    }
  }
  
  return (
    <div>

      <Cabecera_para_formularios />
      
      <div className="flex justify-center mt-20 px-4">

        <div className="border border-gray-300 grid gap-4 grid-cols-1 p-4 w-full max-w-sm items-center">

          <Formulario_registro onRegistro={signin} />

          <Mensaje msg={mensajeError} visible={mostrarMensaje} />

        </div>
      </div>
      
      

    </div>
  );
}

export default SigninPage;
 