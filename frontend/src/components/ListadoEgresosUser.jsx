
function ListadoEgresosUser({ egresos, onEditar, onEliminar }) {
    return (
        <div className="mt-10 w-full">
            <table className="w-4/5 border border-gray-300 mx-auto">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-3 text-left font-semibold">Fecha</th>
                        <th className="border p-3 text-left font-semibold">Descripción</th>
                        <th className="border p-3 text-left font-semibold">Categoría</th>
                        <th className="border p-3 text-left font-semibold">Monto</th>
                        <th className="border p-3 text-center font-semibold">Editar</th>
                        <th className="border p-3 text-center font-semibold">Eliminar</th>
                    </tr>
                </thead>

                <tbody>
                    {egresos.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="p-4 text-center text-gray-500">
                                No hay egresos registrados
                            </td>
                        </tr>
                    ) : (
                        egresos.map((egreso) => (
                            <tr key={egreso.id} className="border-t">
                                <td className="border p-3">{egreso.fecha}</td>
                                <td className="border p-3">{egreso.descripcion}</td>
                                <td className="border p-3">{egreso.categoria}</td>
                                <td className="border p-3">S/. {egreso.monto}</td>
                                <td className="border p-3 text-center">
                                    <button
                                        onClick={() => onEditar(egreso)}
                                        className="bg-yellow-500 text-black px-3 py-1 rounded hover:bg-yellow-600 transition font-semibold"
                                    >
                                        Editar
                                    </button>
                                </td>
                                <td className="border p-3 text-center">
                                    <button
                                        onClick={() => onEliminar(egreso.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition font-semibold"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ListadoEgresosUser;