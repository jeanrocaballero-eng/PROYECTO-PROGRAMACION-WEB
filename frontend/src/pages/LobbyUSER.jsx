import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navegacion_user from "../components/Navegacion_user";
import Header from "../components/Header";
import egresosService, { misEgresosPorDia } from "../services/egresosService";
import authService from "../services/authService";
import usuariosService from "../services/usuariosService";

function LobbyUSER() {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate("/LoginPage");
  };

  const [modalEditar, setModalEditar] = useState(false);
  const [egresoEditando, setEgresoEditando] = useState(null);
  const [formData, setFormData] = useState({
    fecha: "",
    descripcion: "",
    categoria: "",
    monto: "",
  });

  const [egresos, setEgresos] = useState([]);
  const [presupuestoMensual, setPresupuestoMensual] = useState(parseFloat(localStorage.getItem("userBudget") || "0") || 0);
  const [mostrarModalPresupuesto, setMostrarModalPresupuesto] = useState(false);
  const [presupuestoInput, setPresupuestoInput] = useState("");
  const [guardandoPresupuesto, setGuardandoPresupuesto] = useState(false);

  const gastoMesActual = egresos.reduce((acumulado, egreso) => {
    return acumulado + (Number(egreso.monto) || 0);
  }, 0);
  const porcentajeUso = presupuestoMensual > 0 ? Math.min((gastoMesActual / presupuestoMensual) * 100, 100) : 0;
  const montoRestante = Math.max(presupuestoMensual - gastoMesActual, 0);
  const exceso = Math.max(gastoMesActual - presupuestoMensual, 0);

  const cargarEgresos = async () => {
    const userEmail = localStorage.getItem("userEmail");

    if (!userEmail) {
      navigate("/LoginPage");
      return;
    }

    try {
      // NUEVO: traer agrupado por día y aplanar para no cambiar el diseño
      const data = await misEgresosPorDia(true);
      const plano = (data.items || []).flatMap((d) => d.egresos || []);

      const lista = (plano || []).map((e) => ({
        ...e,
        fecha: e.fecha ? e.fecha.slice(0, 10) : "",
        monto: typeof e.monto === "number" ? e.monto : parseFloat(e.monto),
      }));

      setEgresos(lista);
    } catch (error) {
      console.error("Error cargando egresos:", error);
      alert(error.message || "Error de conexión con el servidor");
    }
  };

  useEffect(() => {
    cargarEgresos();
  }, []);

  useEffect(() => {
    setMostrarModalPresupuesto(presupuestoMensual <= 0);
  }, [presupuestoMensual]);

  const handleEditar = (egreso) => {
    setEgresoEditando(egreso);
    setFormData({
      fecha: egreso.fecha || "",
      descripcion: egreso.descripcion || "",
      categoria: egreso.categoria || "",
      monto: egreso.monto ?? "",
    });
    setModalEditar(true);
  };

  const handleGuardar = async () => {
    if (!egresoEditando) return;

    try {
      await egresosService.actualizarEgreso(egresoEditando.id, {
        descripcion: formData.descripcion,
        monto: parseFloat(formData.monto),
        categoria: formData.categoria,
        fecha: `${formData.fecha}T00:00:00`,
      });

      await cargarEgresos();

      setModalEditar(false);
      setEgresoEditando(null);
    } catch (error) {
      console.error("Error al editar:", error);
      alert(error.message || "Error de conexión con el servidor");
    }
  };

  const handleCancelar = () => {
    setModalEditar(false);
    setEgresoEditando(null);
    setFormData({
      fecha: "",
      descripcion: "",
      categoria: "",
      monto: "",
    });
  };

  const handleEliminar = async (id) => {
    if (!confirm("¿Estás seguro de que deseas eliminar este egreso?")) return;

    try {
      await egresosService.eliminarEgreso(id);
      setEgresos((prev) => prev.filter((e) => e.id !== id));
    } catch (error) {
      console.error("Error al eliminar:", error);
      alert(error.message || "Error de conexión con el servidor");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "monto" ? value : value,
    }));
  };

  const handleGuardarPresupuesto = async () => {
    const valor = parseFloat(presupuestoInput);

    if (Number.isNaN(valor) || valor <= 0) {
      alert("Ingresa un presupuesto válido mayor a 0");
      return;
    }

    try {
      setGuardandoPresupuesto(true);
      const data = await usuariosService.actualizarMiPresupuesto(valor);
      const nuevoPresupuesto = Number(data?.presupuesto_mensual) || valor;
      localStorage.setItem("userBudget", String(nuevoPresupuesto));
      setPresupuestoMensual(nuevoPresupuesto);
      setMostrarModalPresupuesto(false);
    } catch (error) {
      alert(error.message || "No se pudo guardar el presupuesto");
    } finally {
      setGuardandoPresupuesto(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      <div className={modalEditar || mostrarModalPresupuesto ? "blur-sm pointer-events-none" : ""}>
        <Header titulo="MIS EGRESOS" tipoUsuario="USER" onLogout={handleLogout} />

        <div className="bg-white border-b border-gray-200 px-4 sm:px-6 md:px-8 py-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
              <h3 className="font-bold text-gray-800 text-sm sm:text-base">Presupuesto mensual</h3>
              <div className="text-xs sm:text-sm text-gray-700">
                Gastado: <span className="font-semibold">S/. {gastoMesActual.toFixed(2)}</span>
                {" · "}
                Restante: <span className="font-semibold">S/. {montoRestante.toFixed(2)}</span>
              </div>
            </div>

            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${porcentajeUso >= 100 ? "bg-red-500" : porcentajeUso >= 80 ? "bg-yellow-500" : "bg-green-500"}`}
                style={{ width: `${porcentajeUso}%` }}
              />
            </div>

            <div className="mt-2 text-xs sm:text-sm text-gray-700">
              Presupuesto: <span className="font-semibold">S/. {presupuestoMensual.toFixed(2)}</span>
              {exceso > 0 ? (
                <span className="ml-2 text-red-600 font-semibold">Exceso: S/. {exceso.toFixed(2)}</span>
              ) : null}
            </div>
          </div>
        </div>

        <Navegacion_user egresos={egresos} onEditar={handleEditar} onEliminar={handleEliminar} />
      </div>

      {mostrarModalPresupuesto && (
        <div className="fixed inset-0 bg-black/55 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 w-full max-w-md">
            <h2 className="text-xl sm:text-2xl font-bold text-center mb-3">Selecciona tu presupuesto mensual</h2>
            <p className="text-sm sm:text-base text-gray-600 text-center mb-5">
              Ingresa cuánto planeas gastar este mes.
            </p>

            <input
              type="number"
              min="1"
              step="0.01"
              value={presupuestoInput}
              onChange={(e) => setPresupuestoInput(e.target.value)}
              placeholder="Ejemplo: 1500"
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-base mb-4"
            />

            <button
              type="button"
              onClick={handleGuardarPresupuesto}
              disabled={guardandoPresupuesto}
              className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition"
            >
              {guardandoPresupuesto ? "Guardando..." : "Aceptar"}
            </button>
          </div>
        </div>
      )}

      {modalEditar && (
        <div className="fixed inset-0 bg-black/35 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 w-full max-w-sm md:max-w-md">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">Editar Egreso</h2>

            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block font-semibold text-gray-700 mb-2 text-sm sm:text-base">Fecha</label>
                <input
                  type="date"
                  name="fecha"
                  value={formData.fecha}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2 text-sm sm:text-base">Descripción</label>
                <input
                  type="text"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2 text-sm sm:text-base">Categoría</label>
                <select
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-400"
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
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2 text-sm sm:text-base">Monto (S/.)</label>
                <input
                  type="number"
                  name="monto"
                  value={formData.monto}
                  onChange={handleInputChange}
                  step="0.01"
                  className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
              <button
                onClick={handleGuardar}
                className="flex-1 bg-blue-500 text-white py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base hover:bg-blue-600 transition"
              >
                Guardar
              </button>
              <button
                onClick={handleCancelar}
                className="flex-1 bg-gray-400 text-white py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base hover:bg-gray-500 transition"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LobbyUSER;