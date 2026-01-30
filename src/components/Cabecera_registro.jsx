import { useNavigate } from "react-router-dom";


function Cabecera_registro(){

  const navigate = useNavigate();

    return (

        <div className="flex shadow-lg items-center justify-between px-4 sm:px-8 md:px-16">
          
          
          <img
            onClick={
              function(){
                navigate("/")
              }
            }
            className="h-16 sm:h-20 md:h-24 my-3"
            src="/imagenes/logo2.png"
            alt="Logo"
          />
        
      </div>
    );

}

export default Cabecera_registro;