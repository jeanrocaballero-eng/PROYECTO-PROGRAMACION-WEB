import { useNavigate } from "react-router-dom";
import Sidebar_user from "../components/Sidebar_user";
import Header from "../components/Header";

function ExportarEgresos() {

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/LoginPage");
  };

  const handleVolver = () => {
    navigate("/LobbyUSER");
  };

  return (
    <div>
      <Header titulo="EXPORTAR EGRESOS" tipoUsuario="USER" onLogout={handleLogout} />


      <div className="flex pb-24">

        <Sidebar_user />

        <main className="flex-1 flex justify-center px-4 py-10 pb-24">
          <div className="border border-gray-300 grid gap-4 grid-cols-1 p-4 w-full max-w-md items-centere">

            <h2 className="font-bold text-xl text-center">Exportación de egresos</h2>
            <p>Selecciona el formato y el rango de fechas para generar tu archivo.</p>

            <form action="">

              <div>Formato</div>
              <div className="mt-2 grid grid-cols-2 gap-3">
                <label className="border-2 border-gray-300 rounded-xl p-3 flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition">
                  <input type="radio" name="formato" value="csv" defaultChecked />
                  <div>
                    <div className="font-semibold">CSV</div>
                    <div className="text-xs text-gray-500">Para Excel u otras apps</div>
                  </div>
                </label>

                <label className="border-2 border-gray-300 rounded-xl p-3 flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition">
                  <input type="radio" name="formato" value="pdf" />
                  <div>
                    <div className="font-semibold">PDF</div>
                    <div className="text-xs text-gray-500">Para compartir/imprimir</div>
                  </div>
                </label>
              </div>

              <div className="mt-4">Rango de fechas</div>
              <div className="grid grid-cols-2 gap-3 mt-2">
                <div>
                  <div className="text-sm text-gray-600">Desde</div>
                  <input
                    className="w-full mt-1 border-2 py-3 rounded border-gray-300 px-4 text-md"
                    type="date"
                    name="desde"
                    id="desde"
                  />
                </div>

                <div>
                  <div className="text-sm text-gray-600">Hasta</div>
                  <input
                    className="w-full mt-1 border-2 py-3 rounded border-gray-300 px-4 text-md"
                    type="date"
                    name="hasta"
                    id="hasta"
                  />
                </div>
              </div>

              <div className="mt-4">Opciones</div>
              <div className="mt-2 grid gap-2">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" defaultChecked />
                  Incluir categoría
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" defaultChecked />
                  Incluir descripción
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" />
                  Ordenar por fecha (desc)
                </label>
              </div>

            </form>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <button
                onClick={handleVolver}
                className="border-2 border-gray-300 text-black p-2 rounded-3xl font-bold text-sm hover:bg-gray-100 transition text-center"
              >
                VOLVER
              </button>

              <button
                className="bg-purple-500 text-white p-2 rounded-3xl font-bold text-sm hover:bg-purple-600 transition text-center"
              >
                EXPORTAR
              </button>
            </div>

          </div>
        </main>

      </div>
    </div>
  );
}

export default ExportarEgresos;
