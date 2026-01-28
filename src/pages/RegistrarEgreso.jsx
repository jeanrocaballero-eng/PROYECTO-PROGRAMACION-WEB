import { useNavigate } from "react-router-dom";

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
      <div className="flex shadow-lg items-center px-16 h-28">

        <button onClick={handleVolver} className="cursor-pointer">
          <img className="h-24" src="/imagenes/logo2.png" alt="Logo del controlador de gastos" />
        </button>

        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold">
          REGISTRAR EGRESO
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
