
function PanelLateralAdmin(){
    return(
        <div className="flex">
            {/* Panel lateral de control */}
            <aside className="w-full md:w-60 p-4 md:p-6 border-r-0 md:border-r-4 flex flex-col gap-4 shadow-r">
                <button
                    onClick={() => navigate("/RegistrarEgreso")}
                    className="bg-black text-white p-2 rounded-3xl mt-10 font-bold text-sm mb-3 hover:bg-gray-700 transition text-center"
                >
                    CREAR
                </button>

                <button
                    onClick={() => navigate("/EditarEgreso")}
                    className="bg-yellow-500 text-black p-2 rounded-3xl mt-4 font-bold text-sm mb-3 hover:bg-yellow-600 transition text-center"
                >
                    EDITAR
                </button>

                <button
                    onClick={() => navigate("/ExportarEgresos")}
                    className="bg-purple-500 text-white p-2 rounded-3xl mt-4 font-bold text-sm mb-3 hover:bg-purple-600 transition text-center"
                >
                    HISTORIAL
                </button>

                <button
                    onClick={() => navigate("/EliminarEgreso")}
                    className="bg-red-500 text-white p-2 rounded-3xl mt-4 font-bold text-sm mb-52 hover:bg-red-600 transition text-center"
                >
                    ELIMINAR
                </button>

                
            </aside>

        </div>
    )
}
export default PanelLateralAdmin;