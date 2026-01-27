import Cabecera_paginas from "../components/Cabecera_paginas";

function EliminarEgreso() {
  return (
    <div>
      <Cabecera_paginas Titulo="ELIMINAR EGRESO" />

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
              <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition">
                Eliminar
              </button>
            </td>
          </tr>

          <tr className="bg-gray-50">
            <td className="border p-3">05/09/2026</td>
            <td className="border p-3">Pago de internet</td>
            <td className="border p-3">Servicios</td>
            <td className="border p-3">S/ 80.00</td>
            <td className="border p-3">
              <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition">
                Eliminar
              </button>
            </td>
          </tr>

          <tr className="bg-gray-50">
            <td className="border p-2">30/09/2026</td>
            <td className="border p-2">Pago de luz</td>
            <td className="border p-2">Servicios</td>
            <td className="border p-2">S/ 120.00</td>
            <td className="border p-2">
              <button className="bg-red-600 text-white px-3 py-1 rounded">
                Eliminar
              </button>
            </td>
          </tr>

          <tr className="bg-gray-50">
            <td className="border p-2">29/09/2026</td>
            <td className="border p-2">Pago de agua</td>
            <td className="border p-2">Servicios</td>
            <td className="border p-2">S/ 90.00</td>
            <td className="border p-2">
              <button className="bg-red-600 text-white px-3 py-1 rounded">
                Eliminar
              </button>
            </td>
          </tr>

          <tr className="bg-gray-50">
            <td className="border p-2">28/09/2026</td>
            <td className="border p-2">Netflix</td>
            <td className="border p-2">Entretenimiento</td>
            <td className="border p-2">S/ 40.00</td>
            <td className="border p-2">
              <button className="bg-red-600 text-white px-3 py-1 rounded">
                Eliminar
              </button>
            </td>
          </tr>

          <tr className="bg-gray-50">
            <td className="border p-2">27/09/2026</td>
            <td className="border p-2">Disney+</td>
            <td className="border p-2">Entretenimiento</td>
            <td className="border p-2">S/ 50.00</td>
            <td className="border p-2">
              <button className="bg-red-600 text-white px-3 py-1 rounded">
                Eliminar
              </button>
            </td>
          </tr>

          <tr className="bg-gray-50">
            <td className="border p-2">26/09/2026</td>
            <td className="border p-2">Amazon Prime Video</td>
            <td className="border p-2">Entretenimiento</td>
            <td className="border p-2">S/ 40.00</td>
            <td className="border p-2">
              <button className="bg-red-600 text-white px-3 py-1 rounded">
                Eliminar
              </button>
            </td>
          </tr>

          <tr className="bg-gray-50">
            <td className="border p-2">27/09/2026</td>
            <td className="border p-2">HBO Max</td>
            <td className="border p-2">Entretenimiento</td>
            <td className="border p-2">S/ 50.00</td>
            <td className="border p-2">
              <button className="bg-red-600 text-white px-3 py-1 rounded">
                Eliminar
              </button>
            </td>
          </tr>

          <tr className="bg-gray-50">
            <td className="border p-2">01/09/2026</td>
            <td className="border p-2">Paramount+</td>
            <td className="border p-2">Entretenimiento</td>
            <td className="border p-2">S/ 30.00</td>
            <td className="border p-2">
              <button className="bg-red-600 text-white px-3 py-1 rounded">
                Eliminar
              </button>
            </td>
          </tr>

          <tr className="bg-gray-50">
            <td className="border p-2">04/09/2026</td>
            <td className="border p-2">Crunchyroll</td>
            <td className="border p-2">Entretenimiento</td>
            <td className="border p-2">S/ 20.00</td>
            <td className="border p-2">
              <button className="bg-red-600 text-white px-3 py-1 rounded">
                Eliminar
              </button>
            </td>
          </tr>

          <tr className="bg-gray-50">
            <td className="border p-2">02/09/2026</td>
            <td className="border p-2">Compra mercado</td>
            <td className="border p-2">Alimentación</td>
            <td className="border p-2">S/ 100.00</td>
            <td className="border p-2">
              <button className="bg-red-600 text-white px-3 py-1 rounded">
                Eliminar
              </button>
            </td>
          </tr>

          <tr className="bg-gray-50">
            <td className="border p-2">06/09/2026</td>
            <td className="border p-2">Internet Móvil</td>
            <td className="border p-2">Servicios</td>
            <td className="border p-2">S/ 40.00</td>
            <td className="border p-2">
              <button className="bg-red-600 text-white px-3 py-1 rounded">
                Eliminar
              </button>
            </td>
          </tr>

          <tr className="bg-gray-50">
            <td className="border p-2">03/09/2026</td>
            <td className="border p-2">Mantenimiento departamento</td>
            <td className="border p-2">Servicios</td>
            <td className="border p-2">S/ 90.00</td>
            <td className="border p-2">
              <button className="bg-red-600 text-white px-3 py-1 rounded">
                Eliminar
              </button>
            </td>
          </tr> 

          <tr className="bg-gray-50">
            <td className="border p-2">20/09/2026</td>
            <td className="border p-2">Mensualidad Universidad</td>
            <td className="border p-2">Educación</td>
            <td className="border p-2">S/ 2000.00</td>
            <td className="border p-2">
              <button className="bg-red-600 text-white px-3 py-1 rounded">
                Eliminar
              </button>
            </td>
          </tr>

          <tr className="bg-gray-50">
            <td className="border p-2">17/09/2026</td>
            <td className="border p-2">Mensualidad Colegio</td>
            <td className="border p-2">Educación</td>
            <td className="border p-2">S/ 500.00</td>
            <td className="border p-2">
              <button className="bg-red-600 text-white px-3 py-1 rounded">
                Eliminar
              </button>
            </td>
          </tr>

          <tr className="bg-gray-50">
            <td className="border p-2">14/09/2026</td>
            <td className="border p-2">Salida al cine</td>
            <td className="border p-2">Recreación</td>
            <td className="border p-2">S/ 160.00</td>
            <td className="border p-2">
              <button className="bg-red-600 text-white px-3 py-1 rounded">
                Eliminar
              </button>
            </td>
          </tr>

          <tr className="bg-gray-50">
            <td className="border p-2">10/09/2026</td>
            <td className="border p-2">Utiles Escolares</td>
            <td className="border p-2">Educación</td>
            <td className="border p-2">S/ 110.00</td>
            <td className="border p-2">
              <button className="bg-red-600 text-white px-3 py-1 rounded">
                Eliminar
              </button>
            </td>
          </tr>

          <tr className="bg-gray-50">
            <td className="border p-2">11/09/2026</td>
            <td className="border p-2">Almuerzo</td>
            <td className="border p-2">Alimentación</td>
            <td className="border p-2">S/ 170.00</td>
            <td className="border p-2">
              <button className="bg-red-600 text-white px-3 py-1 rounded">
                Eliminar
              </button>
            </td>
          </tr>

          <tr className="bg-gray-50">
            <td className="border p-2">22/09/2026</td>
            <td className="border p-2">Compras Ripley</td>
            <td className="border p-2">Vestimenta</td>
            <td className="border p-2">S/ 260.00</td>
            <td className="border p-2">
              <button className="bg-red-600 text-white px-3 py-1 rounded">
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default EliminarEgreso;
