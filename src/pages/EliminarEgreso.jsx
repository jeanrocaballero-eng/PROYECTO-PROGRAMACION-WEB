function EliminarEgreso() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Eliminar Egresos
      </h1>

      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">Fecha</th>
            <th className="border p-2 text-left">Descripción</th>
            <th className="border p-2 text-left">Categoría</th>
            <th className="border p-2 text-left">Monto</th>
            <th className="border p-2 text-left">Acción</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className="border p-2">10/09/2026</td>
            <td className="border p-2">Compra supermercado</td>
            <td className="border p-2">Alimentación</td>
            <td className="border p-2">S/ 150.00</td>
            <td className="border p-2">
              <button className="bg-red-600 text-white px-3 py-1 rounded">
                Eliminar
              </button>
            </td>
          </tr>

          <tr className="bg-gray-50">
            <td className="border p-2">05/09/2026</td>
            <td className="border p-2">Pago de internet</td>
            <td className="border p-2">Servicios</td>
            <td className="border p-2">S/ 80.00</td>
            <td className="border p-2">
              <button className="bg-red-600 text-white px-3 py-1 rounded">
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default EliminarEgreso;
