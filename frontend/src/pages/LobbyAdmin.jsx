import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Navegacion_admin from "../components/Navegacion_admin";
import authService from "../services/authService";
import usuariosService from "../services/usuariosService";

function LobbyAdmin() {

    const navigate = useNavigate();

    const handleLogout = () => {
        authService.logout();
        navigate("/LoginPage");
    };

    const [modalEditar, setModalEditar] = useState(false);
    const [modoCrear, setModoCrear] = useState(false);
    const [usuarioEditando, setUsuarioEditando] = useState(null);
    const [usuarios, setUsuarios] = useState([]);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        contraseña: ""
    });

    // ==============================
    // CARGAR USUARIOS DESDE BACKEND
    // ==============================
    useEffect(() => {
        cargarUsuarios();
    }, []);

    async function cargarUsuarios() {
        try {
            const data = await usuariosService.listarUsuarios();
            setUsuarios(data);
        } catch (err) {
            setError(err.message);
        }
    }

    // ==============================
    // EDITAR
    // ==============================
    const handleEditar = (usuario) => {
        if (usuario.is_admin) return;

        setUsuarioEditando(usuario);
        setModoCrear(false);
        setFormData({
            nombre: usuario.nombre,
            email: usuario.email,
            contraseña: ""
        });
        setModalEditar(true);
    };

    const handleCrear = () => {
        setUsuarioEditando(null);
        setModoCrear(true);
        setFormData({
            nombre: "",
            email: "",
            contraseña: ""
        });
        setModalEditar(true);
    };

    const handleGuardar = async () => {
        try {
            if (modoCrear) {
                if (!formData.contraseña) {
                    setError("Debe ingresar una contraseña");
                    return;
                }
                await usuariosService.crearUsuario({
                    nombre: formData.nombre,
                    email: formData.email,
                    contraseña: formData.contraseña
                });
            } else if (usuarioEditando) {
                await usuariosService.actualizarUsuario(usuarioEditando.id, formData);
            }
            setModalEditar(false);
            setUsuarioEditando(null);
            setModoCrear(false);
            cargarUsuarios();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleCancelar = () => {
        setModalEditar(false);
        setUsuarioEditando(null);
        setModoCrear(false);
        setFormData({
            nombre: "",
            email: "",
            contraseña: ""
        });
        setFormData({
            nombre: "",
            email: "",
            contraseña: ""
        });
    };

    // ==============================
    // ELIMINAR
    // ==============================
    const handleEliminar = async (id) => {
        const usuario = usuarios.find((u) => u.id === id);
        if (usuario?.is_admin) return;

        if (!confirm("¿Estás seguro de que deseas eliminar este usuario?")) return;

        try {
            await usuariosService.eliminarUsuario(id);
            cargarUsuarios();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="relative">
            <div className={modalEditar ? "blur-sm pointer-events-none" : ""}>
                <Header titulo="LISTA DE USUARIOS" tipoUsuario="ADMIN" onLogout={handleLogout} />

                {error && (
                    <div className="bg-red-200 text-red-800 p-2 m-4 rounded">
                        {error}
                    </div>
                )}

                <Navegacion_admin
                    usuarios={usuarios}
                    onEditar={handleEditar}
                    onEliminar={handleEliminar}
                    onCrearUsuario={handleCrear}
                />
            </div>

            {modalEditar && (
                <div className="fixed inset-0 bg-black/35 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-6 text-center">
                            {modoCrear ? "Crear Usuario" : "Editar Usuario"}
                        </h2>

                        <div className="space-y-4">
                            <input
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleInputChange}
                                placeholder="Nombre"
                                className="w-full border rounded px-4 py-2"
                            />

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Correo"
                                className="w-full border rounded px-4 py-2"
                            />

                            {modoCrear && (
                                <input
                                    type="password"
                                    name="contraseña"
                                    value={formData.contraseña}
                                    onChange={handleInputChange}
                                    placeholder="Contraseña"
                                    className="w-full border rounded px-4 py-2"
                                />
                            )}
                        </div>

                        <div className="flex gap-4 mt-6">
                            <button
                                onClick={handleGuardar}
                                className="flex-1 bg-blue-500 text-white py-2 rounded"
                            >
                                Guardar
                            </button>

                            <button
                                onClick={handleCancelar}
                                className="flex-1 bg-gray-400 text-white py-2 rounded"
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

export default LobbyAdmin;
