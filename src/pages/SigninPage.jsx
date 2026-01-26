import Cabecera_para_formularios from "../components/Cabecera_para_formularios";
import Formulario_registro from "../components/Formulario_registro";

function SigninPage() {

  const navigate = useNavigate();

  function signin(nombre, email, contraseña) {
  
    if (nombre != null && email != null && contraseña != null) {
      navigate("/LobbyUSER");
    }
    
  }
  
  return (
    <div>

      <Cabecera_para_formularios />

      <Formulario_registro />
      

    </div>
  );
}

export default SigninPage;
 