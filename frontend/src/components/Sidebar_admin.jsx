import { useNavigate } from "react-router-dom";

function Sidebar_admin() {
    const navigate = useNavigate();

    return (
        <aside className="w-full lg:w-72 bg-linear-to-b from-white to-gray-50 p-4 sm:p-6 md:p-8 border-b lg:border-b-0 lg:border-r-2 border-gray-200 shadow-sm">
            <nav className="space-y-3">

                <button 
                    onClick={() => navigate("/GestionUsuarios")}
                    className="w-full bg-linear-to-r from-black to-gray-800 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg shadow-md hover:shadow-lg hover:from-gray-800 hover:to-gray-900 transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base">
                    CREAR USUARIO
                </button>

                <button 
                    onClick={() => navigate("/HistorialAdmin")}
                    className="w-full bg-linear-to-r from-purple-500 to-purple-600 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg shadow-md hover:shadow-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base">
                    HISTORIAL
                </button>

            </nav>
        </aside>
    );
}

export default Sidebar_admin;
