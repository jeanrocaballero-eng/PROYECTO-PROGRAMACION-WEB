
function ListadoEgresosUser({ egresos }) {
    return (
        <div className="mt-10 w-full">
            <table className="w-4/5 border border-gray-300 mx-auto">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-3 text-left font-semibold">Fecha</th>
                        <th className="border p-3 text-left font-semibold">Descripción</th>
                        <th className="border p-3 text-left font-semibold">Categoría</th>
                        <th className="border p-3 text-left font-semibold">Monto</th>
                    </tr>
                </thead>

                <tbody>
                    {egresos.length === 0 ? (
                        <tr>
                            <td colSpan="4" className="p-4 text-center text-gray-500">
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
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ListadoEgresosUser;