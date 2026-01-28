import { useNavigate } from "react-router-dom";

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
      <div className="flex shadow-lg items-center px-16 h-28">

        <button onClick={handleVolver} className="cursor-pointer">
          <img className="h-24" src="/imagenes/logo2.png" alt="Logo del controlador de gastos" />
        </button>

        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold">
          EXPORTAR EGRESOS
        </h1>

        <div className="ml-auto flex items-center gap-3">
          <span className="bg-gray-300 text-gray-800 px-4 py-1 rounded-full text-xs font-semibold">
            USER
          </span>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-red-600 transition"
          >
            Cerrar sesión
          </button>
        </div>

      </div>

      <div className="flex">

        <aside className="w-60 p-6 border-r-4 flex flex-col gap-4 shadow-r">

          <button
            onClick={() => navigate("/RegistrarEgreso")}
            className="bg-black text-white p-2 rounded-3xl mt-10 font-bold text-sm mb-3 hover:bg-gray-700 transition text-center"
          >
            REGISTRAR
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
            EXPORTAR
          </button>

          <button
            onClick={() => navigate("/EliminarEgreso")}
            className="bg-red-500 text-white p-2 rounded-3xl mt-4 font-bold text-sm mb-52 hover:bg-red-600 transition text-center"
          >
            ELIMINAR
          </button>

          <button
            onClick={() => navigate("/CambiarContraseña")}
            className="text-sm font-bold hover:text-blue-900 ml-3 mb-12 transition cursor-pointer"
          >
            CAMBIAR CONTRASEÑA
          </button>

        </aside>

        <main className="flex-1 flex justify-center px-4 py-10">
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
