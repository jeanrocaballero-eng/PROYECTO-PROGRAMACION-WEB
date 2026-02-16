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
        <div>
            <Cabecera_para_formularios />

            <div className="flex justify-center mt-20 px-4">
                <div className="border border-gray-300 grid gap-4 grid-cols-1 p-4 w-full max-w-sm items-center">

                    <h1 className="font-bold text-2xl text-center">
                        Cambio de contraseña con correo
                    </h1>

                    <form onSubmit={handleEnviarCodigo}>
                    <div>
                        <div>Ingrese su correo electrónico</div>

                        <input 
                            className="w-full mt-3 border-2 py-3 rounded border-gray-300 placeholder:text-gray-400 px-4 text-md"
                            placeholder="Correo electrónico"
                            value={correoElectronico}
                            onChange={(e) => setCorreoElectronico(e.target.value)}
                        />
                    </div>
                    <Mensaje msg="Debe ingresar un correo electrónico" visible={mostrarMensaje}/>

                    <button 
                        type="submit"
                        className="bg-black text-white p-2 rounded-3xl font-bold text-sm mb-2 hover:bg-gray-800 transition text-center w-full mt-4"
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