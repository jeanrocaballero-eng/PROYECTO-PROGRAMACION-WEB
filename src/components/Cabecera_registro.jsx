import { useNavigate } from "react-router-dom";


function Cabecera_registro(){

  const navigate = useNavigate();

    return (

        <div className="flex shadow-lg items-center justify-between">
          
          
          <img
            onClick={
              function(){
                navigate("/")
              }
            }
            className="h-24 my-3 ml-16"
            src="/imagenes/logo2.png"
            alt="Logo"
          />
        
      </div>
    );

}

export default Cabecera_registro;