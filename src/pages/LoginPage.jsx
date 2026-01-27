import Cabecera_para_formularios from "../components/Cabecera_registro";
import { useState } from "react";

function LoginPage() {

    const [mostrarContraseña, setMostrarContraseña] = useState(false);

    return (
    <div>

        <Cabecera_para_formularios />

        <div className="flex justify-center mt-20">
            <div className="border border-gray-300 grid gap-4 grid-cols-1 p-4 w-96 items-center">

                <h1 className="font-bold text-2xl text-center">Iniciar Sesión</h1>
                <p>Ingresa con tu correo y contraseña</p>

                <form action="">
                    <div>Correo Electrónico</div>
                    <input
                    className="w-full mt-1 border-2 py-3 rounded border-gray-300 placeholder:text-gray-400 px-4 text-md"
                    placeholder="Ingresa tu correo electrónico"
                    type="email"
                    name="correo"
                    id="correo"
                    />

                    <div className="mt-4">Contraseña</div>
                    <div className="relative">
                    <input
                    className="w-full mt-1 border-2 py-3 rounded border-gray-300 placeholder:text-gray-400 px-4 text-md"
                    placeholder="Ingresa tu contraseña"
                    type={mostrarContraseña ? "text" : "password"}
                    name="contrasena"
                    id="contrasena"
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
                </form>

                <a href="../main/main_loginUSER.html"
                    className="bg-black text-white p-2 rounded-3xl mt-4 font-bold text-sm mb-2 hover:bg-gray-800 transition text-center">
                    INICIAR SESIÓN
                </a>

                <p className="text-sm text-center text-gray-600">
                    ¿No tienes una cuenta?{" "}
                    <a href="./p5_JR_registrarse.html" className="font-semibold text-black hover:underline">
                    Regístrate
                    </a>
                </p>

            </div>
        </div>

    </div>
    );

}

export default LoginPage;