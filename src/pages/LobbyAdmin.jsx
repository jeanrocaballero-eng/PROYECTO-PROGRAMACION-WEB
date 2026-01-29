import { useNavigate } from "react-router-dom";
import VerUsuarios from "../components/VerUsuarios";

function LobbyAdmin() {

    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/LoginPage");
    };

    return (
        <div>
            <div className="flex shadow-lg items-center px-16 h-28">
                <button 
                    onClick={() => navigate("/LobbyAdmin")}
                    className="cursor-pointer"
                >
                    <img className="h-24" 
                    src="/imagenes/logo2.png" alt="Logo del controlador de gastos" />
                </button>

                <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold">
                    LISTA DE USUARIOS
                </h1>

                <div className="ml-auto flex items-center gap-3">
                    <span className="bg-gray-300 text-gray-800 px-4 py-1 rounded-full text-xs font-semibold">
                        ADMIN
                    </span>

                    <button 
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-red-600 transition"
                    >
                        Cerrar sesión
                    </button>
                </div>
            </div>

            <div className="flex">
                <aside className="w-60 p-6 border-r-4 flex flex-col gap-4 shadow-r">
                    
                    <button className="bg-black text-white p-2 rounded-3xl mt-10 font-bold text-sm mb-3 hover:bg-gray-700 transition">
                        CREAR
                    </button>

                    <button 
                    onClick={() => navigate("/GestionUsuarios")}
                    className="bg-yellow-500 text-black p-2 rounded-3xl mt-4 font-bold text-sm mb-3 hover:bg-yellow-600 transition">
                        EDITAR
                    </button>

                    <button
                    onClick={() => navigate("/HistorialAdmin")} 
                    className="bg-purple-500 text-white p-2 rounded-3xl mt-4 font-bold text-sm mb-3 hover:bg-purple-600 transition">
                        HISTORIAL
                    </button>

                    <button className="bg-red-500 text-white p-2 rounded-3xl mt-4 font-bold text-sm mb-72 hover:bg-red-600 transition">
                        ELIMINAR
                    </button>

                </aside>

                <div className="flex items-start gap-4 ml-5 mt-8 mr-10 h-10">
                    <span className="font-semibold">
                        Filtrar por:
                    </span>

                    <select className="bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400">
                        <option>poner rol</option>
                        <option>poner rol</option>
                        <option>poner rol</option>
                    </select>

                    <button className="bg-gray-300 text-black p-2 rounded-3xl font-bold text-xs hover:bg-gray-400 transition -mr-8">
                        Aplicar
                    </button>
                </div>

                <div className="flex-1 px-10 mt-8">
                    <VerUsuarios />
                </div>
            </div>
        </div>
    );
}

export default LobbyAdmin;
