import { useNavigate } from "react-router-dom";

function ContraseñaCambiada() {

    const navigate = useNavigate();

    return (
        <div>
            <div className="flex justify-center items-center mt-32">
                <div className="text-center">
                    <h1 className="text-5xl font-bold text-green-600 mb-6 mt-8">
                        ✓ Contraseña cambiada
                    </h1>
                    
                    <p className="text-2xl text-gray-700 mb-8">
                        Presione volver para iniciar sesión
                    </p>

                    <button 
                        onClick={() => navigate("/LoginPage")}
                        className="bg-black text-white px-8 py-3 rounded-3xl font-bold text-lg hover:bg-gray-800 transition"
                    >
                        Volver
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ContraseñaCambiada;
