import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Sidebar_user from "../components/Sidebar_user";
import Header from "../components/Header";
import Mensaje from "../components/Mensaje";
import egresosService from "../services/egresosService";
import authService from "../services/authService";



function RegistrarEgreso() {
  const navigate = useNavigate();

  const [fecha, setFecha] = useState("");
  const [monto, setMonto] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [mensajeError, setMensajeError] = useState("");

  const handleLogout = () => {
    authService.logout();
    navigate("/LoginPage");
  };

  const handleVolver = () => {
    navigate("/LobbyUSER");
  };

  async function handleGuardar(e) {
    e.preventDefault();

    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      setMensajeError("No se encontró sesión (userEmail). Inicia sesión primero.");
      setMostrarMensaje(true);
      setTimeout(() => setMostrarMensaje(false), 3000);
      return;
    }

    if (!fecha || !monto || !categoria || !descripcion) {
      setMensajeError("Completa fecha, monto, categoría y descripción.");
      setMostrarMensaje(true);
      setTimeout(() => setMostrarMensaje(false), 3000);
      return;
    }

    try {
      await egresosService.crearEgreso({
        email: userEmail,
        descripcion: descripcion,
        monto: parseFloat(monto),
        categoria: categoria,
        fecha: `${fecha}T00:00:00`,
      });

      navigate("/LobbyUSER");
    } catch (error) {
      console.error(error);
      setMensajeError(error.message || "Error de conexión con el servidor");
      setMostrarMensaje(true);
      setTimeout(() => setMostrarMensaje(false), 3000);
    }
  }

  return (
    <div className="min-h-screen">
      <Header titulo="REGISTRAR EGRESO" tipoUsuario="USER" onLogout={handleLogout} />

      <div className="flex flex-col lg:flex-row pb-12 sm:pb-16 md:pb-20 lg:pb-24">
        <Sidebar_user />

        <main className="flex-1 flex justify-center px-4 sm:px-6 py-6 sm:py-8 md:py-10 pb-12 sm:pb-16 md:pb-20 lg:pb-24">
          <div className="border border-gray-300 grid gap-3 sm:gap-4 grid-cols-1 p-4 sm:p-6 md:p-8 w-full max-w-sm md:max-w-md items-center">
            <h2 className="font-bold text-lg sm:text-xl md:text-2xl text-center">Nuevo egreso</h2>
            <p className="text-sm sm:text-base text-gray-700">Completa fecha, monto, categoría y descripción.</p>

            <form onSubmit={handleGuardar}>
              <div className="text-sm sm:text-base font-medium text-gray-700">Fecha</div>
              <input
                className="w-full mt-1 border-2 py-2 sm:py-3 rounded border-gray-300 px-3 sm:px-4 text-sm sm:text-base"
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                required
              />

              <div className="mt-3 sm:mt-4 text-sm sm:text-base font-medium text-gray-700">Monto (S/)</div>
              <input
                className="w-full mt-1 border-2 py-2 sm:py-3 rounded border-gray-300 placeholder:text-gray-400 px-3 sm:px-4 text-sm sm:text-base"
                placeholder="Ej. 25.50"
                type="number"
                step="0.01"
                min="0"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
                required
              />

              <div className="mt-3 sm:mt-4 text-sm sm:text-base font-medium text-gray-700">Categoría</div>
              <select
                className="w-full mt-1 border-2 py-2 sm:py-3 rounded border-gray-300 px-3 sm:px-4 text-sm sm:text-base bg-white"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                required
              >
                <option value="" disabled>Selecciona una categoría</option>
                <option value="alimentacion">Alimentación</option>
                <option value="transporte">Transporte</option>
                <option value="vivienda">Vivienda</option>
                <option value="servicios">Servicios</option>
                <option value="educacion">Educación</option>
                <option value="salud">Salud</option>
                <option value="entretenimiento">Entretenimiento</option>
                <option value="otros">Otros</option>
              </select>

              <div className="mt-3 sm:mt-4 text-sm sm:text-base font-medium text-gray-700">Descripción</div>
              <textarea
                className="w-full mt-1 border-2 py-2 sm:py-3 rounded border-gray-300 placeholder:text-gray-400 px-3 sm:px-4 text-sm sm:text-base"
                placeholder="Ej. Almuerzo en la universidad"
                rows="3"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                required
              ></textarea>

              <Mensaje msg={mensajeError} visible={mostrarMensaje} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 sm:mt-4">
                <button
                  type="button"
                  onClick={handleVolver}
                  className="border-2 border-gray-300 text-black py-2 sm:py-3 px-4 rounded-3xl font-bold text-sm sm:text-base hover:bg-gray-100 transition text-center"
                >
                  CANCELAR
                </button>

                <button
                  type="submit"
                  className="bg-black text-white py-2 sm:py-3 px-4 rounded-3xl font-bold text-sm sm:text-base hover:bg-gray-800 transition text-center"
                >
                  GUARDAR
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default RegistrarEgreso;