import Cabecera_para_formularios from "../components/Cabecera_registro";
import Formulario_registro from "../components/Formulario_registro";
import Mensaje from "../components/Mensaje";
import { useNavigate } from "react-router-dom";


function SigninPage() {


  function signin(nombre, email, contraseña) {
  
    if (nombre != null && email != null && contraseña != null) {
      navigate("/LobbyUSER");
    }
    
  }
  
  return (
    <div>

      <Cabecera_para_formularios />
      
      <div className="flex justify-center mt-20">

        <div className="border border-gray-300 grid gap-4 grid-cols-1 p-4 w-96 items-center">

          <Formulario_registro />

          <Mensaje msg="Debe completar todos los campos" visible={false} />

        </div>
      </div>
      
      

    </div>
  );
}

export default SigninPage;
 