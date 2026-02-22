import { useNavigate } from "react-router-dom";

function Mainlobby() {

    const navigate = useNavigate();

  return (

    <div className="min-h-screen">

        <div className="flex shadow-lg items-center justify-between px-4 sm:px-6 md:px-12 lg:px-16">

            <a href="/">
            
                <img
                    className="h-14 sm:h-16 md:h-20 lg:h-24 my-2 sm:my-3"
                    src="/imagenes/logo2.png"
                    alt="Logo del controlador de gastos"
                />

            </a>

            <div className="flex gap-2 sm:gap-3">

                <button
                    onClick={ 
                        function(){
                        navigate("/LoginPage")
                        }
                    }
                    className="bg-black text-white py-2 px-4 sm:py-3 sm:px-6 rounded-3xl font-bold text-xs sm:text-sm md:text-base hover:bg-gray-800 transition">
                    Log in
                </button>

                <button
                    onClick={ 
                        function(){
                        navigate("/SigninPage")
                        }
                    }

                    className="bg-yellow-500 text-black py-2 px-4 sm:py-3 sm:px-6 rounded-3xl font-bold text-xs sm:text-sm md:text-base hover:bg-yellow-600 transition">
                    Regístrate
                </button>

            </div>


        </div>

      <img
        src="/imagenes/titulo.png"
        alt="titulo"
        className="flex items-center mx-auto mt-12 sm:mt-16 md:mt-20 lg:mt-28 w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl px-4"
      />

        </div>
  );

}

export default Mainlobby;
