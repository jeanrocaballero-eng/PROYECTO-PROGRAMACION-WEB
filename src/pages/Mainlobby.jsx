import { useNavigate } from "react-router-dom";

function Mainlobby() {

    const navigate = useNavigate();

  return (

    <div>

        <div className="flex shadow-lg items-center justify-between px-4 sm:px-8 md:px-16">

            <a href="/">
            
                <img
                    className="h-16 sm:h-20 md:h-24 my-3"
                    src="/imagenes/logo2.png"
                    alt="Logo del controlador de gastos"
                />

            </a>

            <div className="flex gap-3">

                <button
                    onClick={ 
                        function(){
                        navigate("/LoginPage")
                        }
                    }
                    className="bg-black text-white p-3 rounded-3xl font-bold text-sm px-6 hover:bg-gray-800 transition">
                    Log in
                </button>

                <button
                    onClick={ 
                        function(){
                        navigate("/SigninPage")
                        }
                    }

                    className="bg-yellow-500 text-black p-3 rounded-3xl font-bold text-sm px-6 hover:bg-yellow-600 transition">
                    Regístrate
                </button>

            </div>


        </div>

      <img
        src="/imagenes/titulo.png"
        alt="titulo"
        className="flex items-center mx-auto mt-28"
      />

    </div>
  );

}

export default Mainlobby;
