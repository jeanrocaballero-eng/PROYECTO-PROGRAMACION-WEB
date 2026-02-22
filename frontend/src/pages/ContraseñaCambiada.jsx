import { useNavigate } from "react-router-dom";

function ContraseñaCambiada() {

    const navigate = useNavigate();

    return (
        <div className="min-h-screen">
            <div className="flex justify-center items-center mt-16 sm:mt-20 md:mt-24 lg:mt-32 px-4">
                <div className="text-center">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-600 mb-4 sm:mb-6 mt-4 sm:mt-8">
                        ✓ Contraseña cambiada
                    </h1>
                    
                    <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-6 sm:mb-8">
                        Presione volver para iniciar sesión
                    </p>

                    <button 
                        onClick={() => navigate("/LobbyUSER")}
                        className="bg-black text-white px-6 sm:px-8 py-2 sm:py-3 rounded-3xl font-bold text-base sm:text-lg hover:bg-gray-800 transition"
                    >
                        Volver
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ContraseñaCambiada;
