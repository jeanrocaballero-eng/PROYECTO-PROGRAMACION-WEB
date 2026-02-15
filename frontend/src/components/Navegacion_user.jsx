import { useNavigate } from "react-router-dom";
import ListadoEgresosUser from "./ListadoEgresosUser";
import Sidebar_user from "./Sidebar_user";

function Navegacion_user({ egresos, onEditar, onEliminar }) {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col md:flex-row">
            
            {/* Sidebar */}
            <Sidebar_user />

            {/* Contenido Principal */}
            <div className="flex-1 flex flex-col">
                
                {/* Sección de Filtros */}
                <div className="bg-white border-b border-gray-200 p-6 md:p-8 shadow-sm">
                    <div className="max-w-4xl">
                        <h2 className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-4">Opciones de búsqueda</h2>
                        <div className="flex flex-col sm:flex-row gap-4 items-end">
                            <div className="flex-1">
                                <label className="block text-xs font-semibold text-gray-700 mb-2">Filtrar por:</label>
                                <select className="w-full bg-white border-2 border-gray-300 rounded-lg px-4 py-2 text-sm font-medium focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 transition">
                                    <option>Monto</option>
                                    <option>Categoría</option>
                                    <option>Fecha</option>
                                </select>
                            </div>
                            <button className="w-full sm:w-auto bg-yellow-500 text-black font-bold py-2 px-8 rounded-lg shadow-md hover:shadow-lg hover:bg-yellow-600 transition-all duration-200">
                                Aplicar
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tabla de Egresos */}
                <div className="flex-1 p-6 md:p-8 overflow-auto">
                    <div className="overflow-x-auto">
                        <ListadoEgresosUser 
                            egresos={egresos}
                            onEditar={onEditar}
                            onEliminar={onEliminar}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navegacion_user;
