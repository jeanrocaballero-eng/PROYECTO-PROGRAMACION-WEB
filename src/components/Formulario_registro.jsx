import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Formulario_registro() {

    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [contraseña, setContraseña] = useState("");

    
    return (
            <div>
                <h1 className="font-bold text-2xl text-center">Registro</h1>
                <p className="mt-4">Proporcione los datos correspondientes</p>

                <form>

                    <div className="mt-4">Nombre</div>
                    <input
                        className="w-full mt-1 border-2 py-3 rounded border-gray-300 px-4"
                        placeholder="Ingresa tu nombre"
                        type="text"
                        value={nombre}
                        onChange={
                            function (event) {
                            setNombre(event.target.value);
                            }
                        }
                    />

                    <div className="mt-4">Correo Electrónico</div>
                    <input
                        className="w-full mt-1 border-2 py-3 rounded border-gray-300 px-4"
                        placeholder="Ingresa tu correo electrónico"
                        type="email"
                        value={email}
                        onChange={
                            function (event) {
                            setEmail(event.target.value);
                            }
                        }
                    />

                    <div className="mt-4">Contraseña</div>
                    <input
                        className="w-full mt-1 border-2 py-3 rounded border-gray-300 px-4"
                        placeholder="Ingresa tu contraseña"
                        type="password"
                        value={contraseña}
                        onChange={
                            function (event) {
                            setContraseña(event.target.value);
                            }
                        }
                    />

                </form>

                <button
                type="button"
                className="bg-black text-white p-2 rounded-3xl mt-8 font-bold text-sm mb-3 hover:bg-gray-800 transition w-full">
                    REGISTRARME
                </button>

            </div>
    );
}

export default Formulario_registro;