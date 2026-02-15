import { useNavigate } from "react-router-dom";

function Sidebar_admin() {
    const navigate = useNavigate();

    return (
        <aside className="w-full md:w-72 bg-gradient-to-b from-white to-gray-50 p-6 md:p-8 border-b md:border-b-0 md:border-r-2 border-gray-200 shadow-sm">
            <nav className="space-y-3">
                <button 
                    className="w-full bg-gradient-to-r from-black to-gray-800 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg hover:from-gray-800 hover:to-gray-900 transition-all duration-200 flex items-center justify-center gap-2 text-base">
                    CREAR USUARIO
                </button>

                <button 
                    onClick={() => navigate("/GestionUsuarios")}
                    className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 flex items-center justify-center gap-2 text-base">
                    EDITAR USUARIOS
                </button>

                <button 
                    onClick={() => navigate("/HistorialAdmin")}
                    className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2 text-base">
                    HISTORIAL
                </button>

                <button 
                    className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 flex items-center justify-center gap-2 text-base">
                    ELIMINAR USUARIO
                </button>
            </nav>
        </aside>
    );
}

export default Sidebar_admin;
