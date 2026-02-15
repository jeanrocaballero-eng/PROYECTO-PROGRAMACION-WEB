import Cabecera_para_formularios from "../components/Cabecera_registro";
import Formulario_registro from "../components/Formulario_registro";
import Mensaje from "../components/Mensaje";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


function SigninPage() {

  const navigate = useNavigate();
  const [mostrarMensaje, setMostrarMensaje] = useState(false);

  function signin(nombre, email, contraseña) {
  
    if (nombre && email && contraseña) {
      navigate("/LobbyUSER");
    } else {
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

          <Mensaje msg="Debe completar todos los campos" visible={mostrarMensaje} />

        </div>
      </div>
      
      

    </div>
  );
}

export default SigninPage;
 