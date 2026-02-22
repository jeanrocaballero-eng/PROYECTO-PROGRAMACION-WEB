import { useState } from "react";


function Formulario_registro({ onRegistro }) {

    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [mostrarContraseña, setMostrarContraseña] = useState(false);

    const handleRegistro = (e) => {
        e.preventDefault();
        onRegistro(nombre, email, contraseña);
    };
    
    return (
            <div>
                <h1 className="font-bold text-xl sm:text-2xl md:text-3xl text-center">Registro</h1>
                <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-700">Proporcione los datos correspondientes</p>

                <form onSubmit={handleRegistro}>

                    <div className="mt-3 sm:mt-4 text-sm sm:text-base font-medium text-gray-700">Nombre</div>
                    <input
                        className="w-full mt-1 border-2 py-2 sm:py-3 rounded border-gray-300 px-3 sm:px-4 text-sm sm:text-base"
                        placeholder="Ingresa tu nombre"
                        type="text"
                        value={nombre}
                        onChange={
                            function (event) {
                            setNombre(event.target.value);
                            }
                        }
                    />

                    <div className="mt-3 sm:mt-4 text-sm sm:text-base font-medium text-gray-700">Correo Electrónico</div>
                    <input
                        className="w-full mt-1 border-2 py-2 sm:py-3 rounded border-gray-300 px-3 sm:px-4 text-sm sm:text-base"
                        placeholder="Ingresa tu correo electrónico"
                        type="email"
                        value={email}
                        onChange={
                            function (event) {
                            setEmail(event.target.value);
                            }
                        }
                    />

                    <div className="mt-3 sm:mt-4 text-sm sm:text-base font-medium text-gray-700">Contraseña</div>
                    <div className="relative">
                    <input
                        className="w-full mt-1 border-2 py-2 sm:py-3 rounded border-gray-300 px-3 sm:px-4 text-sm sm:text-base"
                        placeholder="Ingresa tu contraseña"
                        type={mostrarContraseña ? "text" : "password"}
                        value={contraseña}
                        onChange={
                            function (event) {
                            setContraseña(event.target.value);
                            }
                        }
                    />
                    <button
                        type="button"
                        onClick={() => setMostrarContraseña(!mostrarContraseña)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 mt-1"
                    >
                        <img 
                            src={mostrarContraseña ? "/imagenes/visto.png" : "/imagenes/no_visto.png"}
                            alt={mostrarContraseña ? "Ocultar" : "Mostrar"}
                            className="w-4 h-4 sm:w-5 sm:h-5"
                        />
                    </button>
                    </div>

                <button
                type="submit"
                className="bg-black text-white py-2 sm:py-3 px-4 rounded-3xl mt-6 sm:mt-8 font-bold text-sm sm:text-base mb-3 hover:bg-gray-800 transition w-full">
                    REGISTRARME
                </button>

                </form>

            </div>
    );
}

export default Formulario_registro;