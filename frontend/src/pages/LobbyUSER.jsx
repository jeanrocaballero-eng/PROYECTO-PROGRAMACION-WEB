import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navegacion_user from "../components/Navegacion_user";
import Header from "../components/Header";
import egresosService from "../services/egresosService";
import authService from "../services/authService";

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

  const cargarEgresos = async () => {
    const userEmail = localStorage.getItem("userEmail");

    if (!userEmail) {
      navigate("/LoginPage");
      return;
    }

    try {
      const data = await egresosService.listarPorEmail(userEmail);

      const lista = (data.egresos || []).map((e) => ({
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

  return (
    <div>
      <Header titulo="MIS EGRESOS" tipoUsuario="USER" onLogout={handleLogout} />

      <Navegacion_user egresos={egresos} onEditar={handleEditar} onEliminar={handleEliminar} />

      {modalEditar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Editar Egreso</h2>

            <div className="space-y-4">
              <div>
                <label className="block font-semibold text-gray-700 mb-2">Fecha</label>
                <input
                  type="date"
                  name="fecha"
                  value={formData.fecha}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">Descripción</label>
                <input
                  type="text"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">Categoría</label>
                <input
                  type="text"
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">Monto (S/.)</label>
                <input
                  type="number"
                  name="monto"
                  value={formData.monto}
                  onChange={handleInputChange}
                  step="0.01"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={handleGuardar}
                className="flex-1 bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
              >
                Guardar
              </button>
              <button
                onClick={handleCancelar}
                className="flex-1 bg-gray-400 text-white py-2 rounded-lg font-semibold hover:bg-gray-500 transition"
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