import { useNavigate } from "react-router-dom";
import Sidebar_user from "../components/Sidebar_user";
import Header from "../components/Header";

function RegistrarEgreso() {

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/LoginPage");
  };

  const handleVolver = () => {
    navigate("/LobbyUSER");
  };

  return (
    <div>
      <Header titulo="REGISTRAR EGRESO" tipoUsuario="USER" onLogout={handleLogout} />

      <div className="flex pb-24">

        <Sidebar_user />

        <main className="flex-1 flex justify-center px-4 py-10 pb-24">
          <div className="border border-gray-300 grid gap-4 grid-cols-1 p-4 w-full max-w-md items-center">

            <h2 className="font-bold text-xl text-center">Nuevo egreso</h2>
            <p>Completa fecha, monto, categoría y descripción.</p>

            <form action="">

              <div>Fecha</div>
              <input
                className="w-full mt-1 border-2 py-3 rounded border-gray-300 px-4 text-md"
                type="date"
                name="fecha"
                id="fecha"
                required
              />

              <div className="mt-4">Monto (S/)</div>
              <input
                className="w-full mt-1 border-2 py-3 rounded border-gray-300 placeholder:text-gray-400 px-4 text-md"
                placeholder="Ej. 25.50"
                type="number"
                step="0.01"
                min="0"
                name="monto"
                id="monto"
                required
              />

              <div className="mt-4">Categoría</div>
              <select
                className="w-full mt-1 border-2 py-3 rounded border-gray-300 px-4 text-md bg-white"
                name="categoria"
                id="categoria"
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

              <div className="mt-4">Descripción</div>
              <textarea
                className="w-full mt-1 border-2 py-3 rounded border-gray-300 placeholder:text-gray-400 px-4 text-md"
                placeholder="Ej. Almuerzo en la universidad"
                name="descripcion"
                id="descripcion"
                rows="3"
                required
              ></textarea>

            </form>

            <div className="grid grid-cols-2 gap-3 mt-2">
              <button
                onClick={handleVolver}
                className="border-2 border-gray-300 text-black p-2 rounded-3xl font-bold text-sm hover:bg-gray-100 transition text-center"
              >
                CANCELAR
              </button>

              <button
                className="bg-black text-white p-2 rounded-3xl font-bold text-sm hover:bg-gray-800 transition text-center"
              >
                GUARDAR
              </button>
            </div>

          </div>
        </main>

      </div>
    </div>
  );
}

export default RegistrarEgreso;
