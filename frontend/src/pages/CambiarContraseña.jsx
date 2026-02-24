import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cabecera_para_formularios from "../components/Cabecera_registro";
import Mensaje from "../components/Mensaje";
import Cabecera_paginas from "../components/Cabecera_paginas";

function CambiarContraseña() {

    const navigate = useNavigate();
    const [contraseñaActual, setContraseñaActual] = useState("");
    const [contraseñaNueva, setContraseñaNueva] = useState("");
    const [confirmarContraseña, setConfirmarContraseña] = useState("");
    const [mostrarContraseña0, setMostrarContraseña0] = useState(false);
    const [mostrarContraseña1, setMostrarContraseña1] = useState(false);
    const [mostrarContraseña2, setMostrarContraseña2] = useState(false);
    const [mostrarMensaje, setMostrarMensaje] = useState(false);
    const [mensajeError, setMensajeError] = useState("");

    const handleCambiarContraseña = async (e) => {
        e.preventDefault();
        
        if (!contraseñaActual || !contraseñaNueva || !confirmarContraseña) {
            setMensajeError("Debe completar todos los datos");
            setMostrarMensaje(true);
            setTimeout(() => setMostrarMensaje(false), 3000);
            return;
        }

        if (contraseñaNueva !== confirmarContraseña) {
            setMensajeError("Las contraseñas deben coincidir");
            setMostrarMensaje(true);
            setTimeout(() => setMostrarMensaje(false), 3000);
            return;
        }

        try {
            const userEmail = localStorage.getItem('userEmail');
            
            if (!userEmail) {
                setMensajeError("No se encontró la sesión del usuario");
                setMostrarMensaje(true);
                setTimeout(() => setMostrarMensaje(false), 3000);
                return;
            }

            const response = await fetch('http://localhost:8000/api/cambiar-contraseña', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: userEmail,
                    contraseña_actual: contraseñaActual,
                    contraseña_nueva: contraseñaNueva
                })
            });

            const data = await response.json();

            if (response.ok) {
                navigate("/ContraseñaCambiada");
            } else {
                setMensajeError(data.detail || "Error al cambiar contraseña");
                setMostrarMensaje(true);
                setTimeout(() => setMostrarMensaje(false), 3000);
            }
        } catch (error) {
            console.error('Error:', error);
            setMensajeError("Error de conexión con el servidor");
            setMostrarMensaje(true);
            setTimeout(() => setMostrarMensaje(false), 3000);
        }
    };

    const botónHabilitado = contraseñaActual && contraseñaNueva && confirmarContraseña;

    return (
        <div className="min-h-screen">
            <Cabecera_paginas/>

            <div className="flex justify-center mt-8 sm:mt-12 md:mt-16 lg:mt-20 px-4 sm:px-6">
                <div className="border border-gray-300 grid gap-3 sm:gap-4 grid-cols-1 p-4 sm:p-6 md:p-8 w-full max-w-sm md:max-w-md items-center">
                    <h1 className="font-bold text-xl sm:text-2xl md:text-3xl text-center">Cambiar contraseña</h1>

                    <form onSubmit={handleCambiarContraseña}>
                    <div>
                        <div className="text-sm sm:text-base font-medium text-gray-700">Contraseña actual</div>
                        <div className="relative">
                        <input 
                            className="w-full mt-1 border-2 py-2 sm:py-3 rounded border-gray-300 placeholder:text-gray-400 px-3 sm:px-4 text-sm sm:text-base"
                            placeholder="Contraseña actual"
                            type={mostrarContraseña0 ? "text" : "password"}
                            value={contraseñaActual}
                            onChange={(e) => setContraseñaActual(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => setMostrarContraseña0(!mostrarContraseña0)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 mt-1"
                        >
                            <img 
                                src={mostrarContraseña0 ? "/imagenes/visto.png" : "/imagenes/no_visto.png"}
                                alt={mostrarContraseña0 ? "Ocultar" : "Mostrar"}
                                className="w-4 h-4 sm:w-5 sm:h-5"
                            />
                        </button>
                        </div>

                        <div className="mt-3 sm:mt-4 text-sm sm:text-base font-medium text-gray-700">Contraseña nueva</div>
                        <div className="relative">
                        <input 
                            className="w-full mt-1 border-2 py-2 sm:py-3 rounded border-gray-300 placeholder:text-gray-400 px-3 sm:px-4 text-sm sm:text-base"
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
                                className="w-4 h-4 sm:w-5 sm:h-5"
                            />
                        </button>
                        </div>

                        <p className="mt-3 sm:mt-4 italic text-gray-500 text-xs sm:text-sm">(Las contraseñas deben coincidir)</p>

                        <div className="mt-3 sm:mt-4 text-sm sm:text-base font-medium text-gray-700">Confirmar contraseña nueva</div>
                        <div className="relative">
                        <input 
                            className="w-full mt-1 border-2 py-2 sm:py-3 rounded border-gray-300 placeholder:text-gray-400 px-3 sm:px-4 text-sm sm:text-base"
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
                                className="w-4 h-4 sm:w-5 sm:h-5"
                            />
                        </button>
                        </div>
                    </div>

                    <Mensaje msg={mensajeError} visible={mostrarMensaje} />

                    <button 
                        type="submit"
                        disabled={!botónHabilitado}
                        className="bg-black text-white py-2 sm:py-3 px-4 rounded-3xl mt-3 sm:mt-4 font-bold text-sm sm:text-base hover:bg-gray-800 transition w-full">
                        CAMBIAR CONTRASEÑA
                    </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CambiarContraseña;
