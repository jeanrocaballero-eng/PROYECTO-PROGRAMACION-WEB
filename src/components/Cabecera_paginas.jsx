import { useNavigate } from "react-router-dom";


function Cabecera_paginas({Titulo}) {

    const navigate = useNavigate();

    return (

        <div className="flex shadow-lg items-center px-4 sm:px-8 md:px-16 h-20 sm:h-24 md:h-28">

                
                <img 
                className="h-24" 
                src="/imagenes/logo2.png" 
                alt="Logo del controlador de gastos"/>
                

                <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold">
                    {Titulo}
                </h1>

                <div className="ml-auto flex items-center gap-3">
                    <button 
                    onClick={() => navigate("/LobbyUSER")}
                    className="bg-gray-500 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-gray-600 transition">
                        Regresar
                    </button>
                </div>

            </div>
    );

}

export default Cabecera_paginas;
