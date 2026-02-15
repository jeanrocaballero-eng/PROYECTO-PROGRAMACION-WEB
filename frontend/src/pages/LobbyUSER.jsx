import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Navegacion_user from "../components/Navegacion_user";
import Header from "../components/Header";
 
function LobbyUSER() {

    const navigate = useNavigate();
    
    const handleLogout = () => {
        navigate("/LoginPage");
    };

    const [modalEditar, setModalEditar] = useState(false);
    const [egresoEditando, setEgresoEditando] = useState(null);
    const [formData, setFormData] = useState({
        fecha: "",
        descripcion: "",
        categoria: "",
        monto: ""
    });

    const [egresos, setEgresos] = useState([
        {
            id: 1,
            fecha: "2025-10-08",
            descripcion: "Supermercado",
            categoria: "Alimentos",
            monto: 120
        },
        {
            id: 2,
            fecha: "2025-10-10",
            descripcion: "Internet",
            categoria: "Servicios",
            monto: 80
        },
        {
            id: 3,
            fecha: "2026-01-15",
            descripcion: "Libros",
            categoria: "Educación",
            monto: 70
        },
        {
            id: 4,
            fecha: "2026-01-25",
            descripcion: "Almuerzo",
            categoria: "Alimentos",
            monto: 25
        },
        {
            id: 5,
            fecha: "2026-02-01",
            descripcion: "Gasolina",
            categoria: "Transporte",
            monto: 60
        },
        {
            id: 6,
            fecha: "2026-02-03",
            descripcion: "Cine",
            categoria: "Entretenimiento",
            monto: 35
        },
        {
            id: 7,
            fecha: "2026-02-05",
            descripcion: "Ropa",
            categoria: "Compras",
            monto: 150
        },
        {
            id: 8,
            fecha: "2026-02-10",
            descripcion: "Electricidad",
            categoria: "Servicios",
            monto: 95
        },
        {
            id: 9,
            fecha: "2026-02-12",
            descripcion: "Consulta médica",
            categoria: "Salud",
            monto: 120
        },
        {
            id: 10,
            fecha: "2026-02-15",
            descripcion: "Café",
            categoria: "Alimentos",
            monto: 8
        },
        {
            id: 11,
            fecha: "2026-02-18",
            descripcion: "Taxi",
            categoria: "Transporte",
            monto: 22
        },
        {
            id: 12,
            fecha: "2026-02-20",
            descripcion: "Suscripción streaming",
            categoria: "Entretenimiento",
            monto: 15
        },
        {
            id: 13,
            fecha: "2026-02-26",
            descripcion: "Agua",
            categoria: "Servicios",
            monto: 95
        }
    ]);

    const handleEditar = (egreso) => {
        setEgresoEditando(egreso);
        setFormData({
            fecha: egreso.fecha,
            descripcion: egreso.descripcion,
            categoria: egreso.categoria,
            monto: egreso.monto
        });
        setModalEditar(true);
    };

    const handleGuardar = () => {
        setEgresos(egresos.map(e => 
            e.id === egresoEditando.id 
                ? { ...e, ...formData }
                : e
        ));
        setModalEditar(false);
        setEgresoEditando(null);
    };

    const handleCancelar = () => {
        setModalEditar(false);
        setEgresoEditando(null);
        setFormData({
            fecha: "",
            descripcion: "",
            categoria: "",
            monto: ""
        });
    };

    const handleEliminar = (id) => {
        if (confirm("¿Estás seguro de que deseas eliminar este egreso?")) {
            setEgresos(egresos.filter(e => e.id !== id));
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === "monto" ? parseFloat(value) || "" : value
        }));
    };

    return (
        <div>
            {/* Enacabezado */}
            <Header titulo="MIS EGRESOS" tipoUsuario="USER" onLogout={handleLogout} />

            {/* Navegación Principal */}
            <Navegacion_user 
                egresos={egresos}
                onEditar={handleEditar}
                onEliminar={handleEliminar}
            />

            {/* Modal de Editar Egreso */}
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