import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cabecera_para_formularios from "../components/Cabecera_registro";
import Mensaje from "../components/Mensaje";
import Cabecera_paginas from "../components/Cabecera_paginas";

function CambiarContraseña() {

    const navigate = useNavigate();
    const [contraseñaNueva, setContraseñaNueva] = useState("");
    const [confirmarContraseña, setConfirmarContraseña] = useState("");
    const [mostrarContraseña1, setMostrarContraseña1] = useState(false);
    const [mostrarContraseña2, setMostrarContraseña2] = useState(false);
    const [mostrarMensaje, setMostrarMensaje] = useState(false);
    const [mensajeError, setMensajeError] = useState("");

    const handleCambiarContraseña = (e) => {
        e.preventDefault();
        if (contraseñaNueva && confirmarContraseña) {
            if (contraseñaNueva === confirmarContraseña) {
                navigate("/ContraseñaCambiada2");
            } else {
                setMensajeError("Las contraseñas deben coincidir");
                setMostrarMensaje(true);
                setTimeout(() => setMostrarMensaje(false), 3000);
            }
        } else {
            setMensajeError("Debe completar todos los datos");
            setMostrarMensaje(true);
            setTimeout(() => setMostrarMensaje(false), 3000);
        }
    };

    const botónHabilitado = contraseñaNueva && confirmarContraseña;

    return (
        <div>
            <Cabecera_para_formularios/>

            <div className="flex justify-center mt-20 px-4">
                <div className="border border-gray-300 grid gap-4 grid-cols-1 p-4 w-full max-w-sm items-center">
                    <h1 className="font-bold text-2xl text-center">Cambiar contraseña</h1>

                    <form onSubmit={handleCambiarContraseña}>
                    <div>
                        <div>Contraseña nueva</div>
                        <div className="relative">
                        <input 
                            className="w-full mt-1 border-2 py-3 rounded border-gray-300 placeholder:text-gray-400 px-4 text-md"
                            placeholder="Nueva contraseña"
                            type={mostrarContraseña1 ? "text" : "password"}
                            value={contraseñaNueva}
                            onChange={(e) => setContraseñaNueva(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => setMostrarContraseña1(!mostrarContraseña1)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 mt-1"
                        >
                            <img 
                                src={mostrarContraseña1 ? "/imagenes/visto.png" : "/imagenes/no_visto.png"}
                                alt={mostrarContraseña1 ? "Ocultar" : "Mostrar"}
                                className="w-5 h-5"
                            />
                        </button>
                        </div>

                        <p className="mt-4 italic text-gray-500">(Las contraseñas deben coincidir)</p>

                        <div className="mt-4">Confirmar contraseña nueva</div>
                        <div className="relative">
                        <input 
                            className="w-full mt-1 border-2 py-3 rounded border-gray-300 placeholder:text-gray-400 px-4 text-md"
                            placeholder="Confirme su contraseña"
                            type={mostrarContraseña2 ? "text" : "password"}
                            value={confirmarContraseña}
                            onChange={(e) => setConfirmarContraseña(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => setMostrarContraseña2(!mostrarContraseña2)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 mt-1"
                        >
                            <img 
                                src={mostrarContraseña2 ? "/imagenes/visto.png" : "/imagenes/no_visto.png"}
                                alt={mostrarContraseña2 ? "Ocultar" : "Mostrar"}
                                className="w-5 h-5"
                            />
                        </button>
                        </div>
                    </div>

                    <Mensaje msg={mensajeError} visible={mostrarMensaje} />

                    <button 
                        type="submit"
                        disabled={!botónHabilitado}
                        className="bg-black text-white p-2 rounded-3xl mt-5 font-bold text-sm hover:bg-gray-800 transition w-full">
                        CAMBIAR CONTRASEÑA
                    </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CambiarContraseña;
