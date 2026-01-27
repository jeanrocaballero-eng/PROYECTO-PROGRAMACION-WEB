import Cabecera_paginas from "../components/Cabecera_paginas";

function EditarEgreso(){
    return (

    <div>
      <Cabecera_paginas Titulo="EDITAR EGRESO" />

      <div className="p-6 flex justify-center">
      <table className="w-4/5 border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-3 text-left font-semibold">Fecha</th>
            <th className="border p-3 text-left font-semibold">Descripción</th>
            <th className="border p-3 text-left font-semibold">Categoría</th>
            <th className="border p-3 text-left font-semibold">Monto</th>
            <th className="border p-3 text-left font-semibold">Acción</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className="border p-3">10/09/2026</td>
            <td className="border p-3">Compra supermercado</td>
            <td className="border p-3">Alimentación</td>
            <td className="border p-3">S/ 150.00</td>
            <td className="border p-3">
              <button className="bg-yellow-500 text-black font px-3 py-1 rounded hover:bg-yellow-600 transition">
                Editar
              </button>
            </td>
          </tr>

          <tr className="bg-gray-50">
            <td className="border p-3">05/09/2026</td>
            <td className="border p-3">Pago de internet</td>
            <td className="border p-3">Servicios</td>
            <td className="border p-3">S/ 80.00</td>
            <td className="border p-3">
              <button className="bg-yellow-500 text-black px-3 py-1 rounded hover:bg-yellow-600 transition">
                Editar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>

    );
}

export default EditarEgreso;