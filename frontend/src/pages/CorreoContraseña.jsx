import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cabecera_para_formularios from "../components/Cabecera_registro";
import Mensaje from "../components/Mensaje";

function CorreoContraseña() {
    const navigate = useNavigate();

    const [correoElectronico, setCorreoElectronico] = useState("");
    const [mostrarMensaje, setMostrarMensaje] = useState(false);

    const handleEnviarCodigo = (e) => {
        e.preventDefault();
        if (correoElectronico.trim() === "" || !correoElectronico.includes("@")) {
            setMostrarMensaje(true);
            setTimeout(() => setMostrarMensaje(false), 3000);
            return;
        }

        navigate("/CambiarContraseña2");
    };

    return (
        <div className="min-h-screen">
            <Cabecera_para_formularios />

            <div className="flex justify-center mt-8 sm:mt-12 md:mt-16 lg:mt-20 px-4 sm:px-6">
                <div className="border border-gray-300 grid gap-3 sm:gap-4 grid-cols-1 p-4 sm:p-6 md:p-8 w-full max-w-sm md:max-w-md items-center">

                    <h1 className="font-bold text-xl sm:text-2xl md:text-3xl text-center">
                        Cambio de contraseña con correo
                    </h1>

                    <form onSubmit={handleEnviarCodigo}>
                    <div>
                        <div className="text-sm sm:text-base font-medium text-gray-700">Ingrese su correo electrónico</div>

                        <input 
                            className="w-full mt-2 sm:mt-3 border-2 py-2 sm:py-3 rounded border-gray-300 placeholder:text-gray-400 px-3 sm:px-4 text-sm sm:text-base"
                            placeholder="Correo electrónico"
                            value={correoElectronico}
                            onChange={(e) => setCorreoElectronico(e.target.value)}
                        />
                    </div>
                    <Mensaje msg="Debe ingresar un correo electrónico" visible={mostrarMensaje}/>

                    <button 
                        type="submit"
                        className="bg-black text-white py-2 sm:py-3 px-4 rounded-3xl font-bold text-sm sm:text-base mb-2 hover:bg-gray-800 transition text-center w-full mt-3 sm:mt-4"
                    >
                        Enviar Código
                    </button>
                    </form>

                </div>
            </div>
        </div>
    );
}

export default CorreoContraseña;