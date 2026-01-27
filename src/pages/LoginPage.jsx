import Cabecera_para_formularios from "../components/Cabecera_registro";
import Mensaje from "../components/Mensaje";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {

    const navigate = useNavigate();
    const [correo, setCorreo] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [mostrarContraseña, setMostrarContraseña] = useState(false);
    const [mostrarMensaje, setMostrarMensaje] = useState(false);

    const cuentas = {
        "ADMIN": "123",
        "USER": "123"
    };

    const handleLogin = () => {
        if (cuentas[correo] && cuentas[correo] === contraseña) {
            if (correo === "ADMIN") {
                navigate("/LobbyAdmin");
            } else if (correo === "USER") {
                navigate("/LobbyUSER");
            }
            setCorreo("");
            setContraseña("");
            setMostrarMensaje(false);
        } else {
            setMostrarMensaje(true);
            setTimeout(() => setMostrarMensaje(false), 3000);
        }
    };

    return (
    <div>

        <Cabecera_para_formularios />

        <div className="flex justify-center mt-20">
            <div className="border border-gray-300 grid gap-4 grid-cols-1 p-4 w-96 items-center">

                <h1 className="font-bold text-2xl text-center">Iniciar Sesión</h1>
                <p>Ingresa con tu correo y contraseña</p>

                <div>
                    <div>Correo Electrónico</div>
                    <input
                    className="w-full mt-1 border-2 py-3 rounded border-gray-300 placeholder:text-gray-400 px-4 text-md"
                    placeholder="Ingresa tu correo electrónico"
                    type="text"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    />

                    <div className="mt-4">Contraseña</div>
                    <div className="relative">
                    <input
                    className="w-full mt-1 border-2 py-3 rounded border-gray-300 placeholder:text-gray-400 px-4 text-md"
                    placeholder="Ingresa tu contraseña"
                    type={mostrarContraseña ? "text" : "password"}
                    value={contraseña}
                    onChange={(e) => setContraseña(e.target.value)}
                    />
                    <button
                        type="button"
                        onClick={() => setMostrarContraseña(!mostrarContraseña)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 mt-1"
                    >
                        <img 
                            src={mostrarContraseña ? "/imagenes/visto.png" : "/imagenes/no_visto.png"}
                            alt={mostrarContraseña ? "Ocultar" : "Mostrar"}
                            className="w-5 h-5"
                        />
                    </button>
                    </div>

                    <div className="mt-3 text-right">
                    <a href="./p23_JR_cambiarContraseña.html"
                        className="text-sm text-gray-600 hover:text-black transition">
                        ¿Olvidaste tu contraseña?
                    </a>
                    </div>
                </div>

                <Mensaje msg="Datos incorrectos" visible={mostrarMensaje} />

                <button
                    type="button"
                    onClick={handleLogin}
                    className="bg-black text-white p-2 rounded-3xl mt-4 font-bold text-sm mb-2 hover:bg-gray-800 transition text-center w-full"
                >
                    INICIAR SESIÓN
                </button>

                <p className="text-sm text-center text-gray-600">
                    ¿No tienes una cuenta?{" "}
                    <button 
                        type="button"
                        onClick={() => navigate("/SigninPage")}
                        className="font-semibold text-black hover:underline bg-none border-none cursor-pointer"
                    >
                    Regístrate
                    </button>
                </p>

            </div>
        </div>

    </div>
    );

}

export default LoginPage;