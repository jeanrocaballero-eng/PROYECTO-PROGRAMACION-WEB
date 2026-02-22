import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Sidebar_user from "../components/Sidebar_user";
import Header from "../components/Header";
import fileService from "../services/fileService";
import authService from "../services/authService";

function ExportarEgresos() {
  const navigate = useNavigate();

  const [formato, setFormato] = useState("csv");
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [incluirCategoria, setIncluirCategoria] = useState(true);
  const [incluirDescripcion, setIncluirDescripcion] = useState(true);
  const [ordenDesc, setOrdenDesc] = useState(false);

  const handleLogout = () => {
    authService.logout();
    navigate("/LoginPage");
  };

  const handleVolver = () => {
    navigate("/LobbyUSER");
  };

  const handleExportar = async () => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      alert("No se encontró sesión (userEmail). Inicia sesión primero.");
      return;
    }

    try {
      const blob = await fileService.exportarEgresos(userEmail, {
        formato,
        desde,
        hasta,
        incluirCategoria,
        incluirDescripcion,
        ordenDesc,
      });

      fileService.descargarBlob(
        blob,
        formato === "csv" ? "egresos.csv" : "egresos.pdf"
      );
    } catch (err) {
      console.error(err);
      alert(err.message || "Error de conexión con el servidor");
    }
  };

  return (
    <div className="min-h-screen">
      <Header titulo="EXPORTAR EGRESOS" tipoUsuario="USER" onLogout={handleLogout} />

      <div className="flex flex-col lg:flex-row pb-12 sm:pb-16 md:pb-20 lg:pb-24">
        <Sidebar_user />

        <main className="flex-1 flex justify-center px-4 sm:px-6 py-6 sm:py-8 md:py-10 pb-12 sm:pb-16 md:pb-20 lg:pb-24">
          <div className="border border-gray-300 grid gap-3 sm:gap-4 grid-cols-1 p-4 sm:p-6 md:p-8 w-full max-w-sm md:max-w-md items-center">
            <h2 className="font-bold text-lg sm:text-xl md:text-2xl text-center">Exportación de egresos</h2>
            <p className="text-sm sm:text-base text-gray-700">Selecciona el formato y el rango de fechas para generar tu archivo.</p>

            <div>
              <div className="text-sm sm:text-base font-medium text-gray-700">Formato</div>
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="border-2 border-gray-300 rounded-xl p-3 flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition">
                  <input
                    type="radio"
                    name="formato"
                    value="csv"
                    checked={formato === "csv"}
                    onChange={() => setFormato("csv")}
                  />
                  <div>
                    <div className="font-semibold text-sm sm:text-base">CSV</div>
                    <div className="text-xs text-gray-500">Para Excel u otras apps</div>
                  </div>
                </label>

                <label className="border-2 border-gray-300 rounded-xl p-3 flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition">
                  <input
                    type="radio"
                    name="formato"
                    value="pdf"
                    checked={formato === "pdf"}
                    onChange={() => setFormato("pdf")}
                  />
                  <div>
                    <div className="font-semibold text-sm sm:text-base">PDF</div>
                    <div className="text-xs text-gray-500">Para compartir/imprimir</div>
                  </div>
                </label>
              </div>

              <div className="mt-3 sm:mt-4 text-sm sm:text-base font-medium text-gray-700">Rango de fechas</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                <div>
                  <div className="text-xs sm:text-sm text-gray-600">Desde</div>
                  <input
                    className="w-full mt-1 border-2 py-2 sm:py-3 rounded border-gray-300 px-3 sm:px-4 text-sm sm:text-base"
                    type="date"
                    value={desde}
                    onChange={(e) => setDesde(e.target.value)}
                  />
                </div>

                <div>
                  <div className="text-xs sm:text-sm text-gray-600">Hasta</div>
                  <input
                    className="w-full mt-1 border-2 py-2 sm:py-3 rounded border-gray-300 px-3 sm:px-4 text-sm sm:text-base"
                    type="date"
                    value={hasta}
                    onChange={(e) => setHasta(e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-3 sm:mt-4 text-sm sm:text-base font-medium text-gray-700">Opciones</div>
              <div className="mt-2 grid gap-2">
                <label className="flex items-center gap-2 text-xs sm:text-sm">
                  <input
                    type="checkbox"
                    checked={incluirCategoria}
                    onChange={(e) => setIncluirCategoria(e.target.checked)}
                  />
                  Incluir categoría
                </label>
                <label className="flex items-center gap-2 text-xs sm:text-sm">
                  <input
                    type="checkbox"
                    checked={incluirDescripcion}
                    onChange={(e) => setIncluirDescripcion(e.target.checked)}
                  />
                  Incluir descripción
                </label>
                <label className="flex items-center gap-2 text-xs sm:text-sm">
                  <input
                    type="checkbox"
                    checked={ordenDesc}
                    onChange={(e) => setOrdenDesc(e.target.checked)}
                  />
                  Ordenar por fecha (desc)
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 sm:mt-4">
              <button
                onClick={handleVolver}
                className="border-2 border-gray-300 text-black py-2 sm:py-3 px-4 rounded-3xl font-bold text-sm sm:text-base hover:bg-gray-100 transition text-center"
              >
                VOLVER
              </button>

              <button
                onClick={handleExportar}
                className="bg-purple-500 text-white py-2 sm:py-3 px-4 rounded-3xl font-bold text-sm sm:text-base hover:bg-purple-600 transition text-center"
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