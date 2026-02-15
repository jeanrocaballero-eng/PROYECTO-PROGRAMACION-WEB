import { useNavigate } from "react-router-dom";

function Sidebar_user() {
    const navigate = useNavigate();

    return (
        <aside className="w-full md:w-72 bg-gradient-to-b from-white to-gray-50 p-6 md:p-8 border-b md:border-b-0 md:border-r-2 border-gray-200 shadow-sm">
            <nav className="space-y-3">
                <button 
                    onClick={() => navigate("/RegistrarEgreso")}
                    className="w-full bg-gradient-to-r from-black to-gray-800 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg hover:from-gray-800 hover:to-gray-900 transition-all duration-200 flex items-center justify-center gap-2 text-base">
                    REGISTRAR EGRESO
                </button>

                <button 
                    onClick={() => navigate("/ExportarEgresos")}
                    className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 flex items-center justify-center gap-2 text-base">
                    EXPORTAR DATOS
                </button>

                <button 
                    onClick={() => navigate("/CambiarContraseña")}
                    className="w-full bg-white border-2 border-gray-400 text-gray-700 font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg hover:border-black hover:text-black transition-all duration-200 flex items-center justify-center gap-2 text-base">
                    CAMBIAR CONTRASEÑA
                </button>
            </nav>
        </aside>
    );
}

export default Sidebar_user;
