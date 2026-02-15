import { useNavigate } from "react-router-dom";
import { useState } from "react";
import VerUsuarios from "../components/VerUsuarios";

function LobbyAdmin() {

    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/LoginPage");
    };

    const [modalEditar, setModalEditar] = useState(false);
    const [usuarioEditando, setUsuarioEditando] = useState(null);
    const [formData, setFormData] = useState({
        nombre: "",
        correo: "",
        rol: "Usuario",
        estado: "Activo"
    });

    const [usuarios, setUsuarios] = useState([
        { id: 1, nombre: "Hernan Quintana", correo: "hernanquint@gmail.com", rol: "Administrador", estado: "-" },
        { id: 2, nombre: "Jesus Pisconte", correo: "jesuspisc@gmail.com", rol: "Usuario", estado: "Inactivo" },
        { id: 3, nombre: "Raul Quispe", correo: "raulquisp@gmail.com", rol: "Usuario", estado: "Activo" },
        { id: 4, nombre: "Angelo Huarancca", correo: "angelohuarancc@gmail.com", rol: "Usuario", estado: "Activo" },
        { id: 5, nombre: "Alejandro Pacheco", correo: "alejandropachec@gmail.com", rol: "Usuario", estado: "Activo" },
        { id: 6, nombre: "Jeanpierr Rojas", correo: "jeanpierrroj@gmail.com", rol: "Usuario", estado: "Activo" },
        { id: 7, nombre: "Claudia Sipion", correo: "claudiasip@gmail.com", rol: "Usuario", estado: "Inactivo" },
        { id: 8, nombre: "Pedro Pascal", correo: "pedropasc@gmail.com", rol: "Usuario", estado: "Inactivo" },
        { id: 9, nombre: "Mark Hamill", correo: "markham@gmail.com", rol: "Usuario", estado: "Inactivo" },
        { id: 10, nombre: "Carrie Fisher", correo: "carriefish@gmail.com", rol: "Usuario", estado: "Inactivo" },
        { id: 11, nombre: "Harrison Ford", correo: "harrisonf@gmail.com", rol: "Usuario", estado: "Activo" },
        { id: 12, nombre: "Hayden Christensen", correo: "haydenchris@gmail.com", rol: "Usuario", estado: "Activo" },
        { id: 13, nombre: "Ewan McGregor", correo: "ewanmcgreg@gmail.com", rol: "Usuario", estado: "Activo" },
        { id: 14, nombre: "Natalie Portman", correo: "natalieport@gmail.com", rol: "Usuario", estado: "Activo" },
        { id: 15, nombre: "Patricia Stuart", correo: "patriciastu@gmail.com", rol: "Usuario", estado: "Activo" },
        { id: 16, nombre: "Nadia Rodriguez", correo: "nadiarodrig@gmail.com", rol: "Usuario", estado: "Activo" },
        { id: 17, nombre: "Oscar Quezada", correo: "oscarquez@gmail.com", rol: "Usuario", estado: "Activo" },
        { id: 18, nombre: "Jim Dios", correo: "jimdios@gmail.com", rol: "Usuario", estado: "Activo" },
        { id: 19, nombre: "Antonio Pinilla", correo: "antoniopin@gmail.com", rol: "Usuario", estado: "Activo" }
    ]);

    const handleEditar = (usuario) => {
        setUsuarioEditando(usuario);
        setFormData({
            nombre: usuario.nombre,
            correo: usuario.correo,
            rol: usuario.rol,
            estado: usuario.estado
        });
        setModalEditar(true);
    };

    const handleGuardar = () => {
        setUsuarios(usuarios.map(u => 
            u.id === usuarioEditando.id
                ? { ...u, ...formData }
                : u
        ));
        setModalEditar(false);
        setUsuarioEditando(null);
    };

    const handleCancelar = () => {
        setModalEditar(false);
        setUsuarioEditando(null);
        setFormData({
            nombre: "",
            correo: "",
            rol: "Usuario",
            estado: "Activo"
        });
    };

    const handleEliminar = (id) => {
        if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
            setUsuarios(usuarios.filter(u => u.id !== id));
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
        <div>
            <div className="flex shadow-lg items-center px-4 sm:px-8 md:px-16 h-20 sm:h-24 md:h-28">
                <button 
                    onClick={() => navigate("/LobbyAdmin")}
                    className="cursor-pointer"
                >
                    <img className="h-24" 
                    src="/imagenes/logo2.png" alt="Logo del controlador de gastos" />
                </button>

                <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold">
                    LISTA DE USUARIOS
                </h1>

                <div className="ml-auto flex items-center gap-3">
                    <span className="bg-gray-300 text-gray-800 px-4 py-1 rounded-full text-xs font-semibold">
                        ADMIN
                    </span>

                    <button 
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-red-600 transition"
                    >
                        Cerrar sesión
                    </button>
                </div>
            </div>

            <div className="flex flex-col md:flex-row">
                <aside className="w-full md:w-60 p-4 md:p-6 border-r-0 md:border-r-4 flex flex-col gap-4 shadow-r">
                    
                    <button className="bg-black text-white p-2 rounded-3xl mt-10 font-bold text-sm mb-3 hover:bg-gray-700 transition">
                        CREAR
                    </button>

                    <button 
                    onClick={() => navigate("/GestionUsuarios")}
                    className="bg-yellow-500 text-black p-2 rounded-3xl mt-4 font-bold text-sm mb-3 hover:bg-yellow-600 transition">
                        EDITAR
                    </button>

                    <button
                    onClick={() => navigate("/HistorialAdmin")} 
                    className="bg-purple-500 text-white p-2 rounded-3xl mt-4 font-bold text-sm mb-3 hover:bg-purple-600 transition">
                        HISTORIAL
                    </button>

                    <button className="bg-red-500 text-white p-2 rounded-3xl mt-4 font-bold text-sm mb-72 hover:bg-red-600 transition">
                        ELIMINAR
                    </button>

                </aside>

                <div className="flex flex-col sm:flex-row items-start gap-4 ml-5 mt-8 mr-5 md:mr-10 h-auto sm:h-10 px-4 md:px-0">
                    <span className="font-semibold">
                        Filtrar por:
                    </span>

                    <select className="bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400">
                        <option>Administrador</option>
                        <option>Usuario</option>
                        
                    </select>

                    <button className="bg-gray-300 text-black p-2 rounded-3xl font-bold text-xs hover:bg-gray-400 transition -mr-8">
                        Aplicar
                    </button>
                </div>

                <div className="flex-1 px-4 md:px-10 mt-8">
                    <VerUsuarios
                        usuarios={usuarios}
                        onEditar={handleEditar}
                        onEliminar={handleEliminar}
                    />
                </div>
            </div>

            {/* Modal de Editar Usuario */}
            {modalEditar && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-6 text-center">Editar Usuario</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block font-semibold text-gray-700 mb-2">Nombre</label>
                                <input
                                    type="text"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                />
                            </div>

                            <div>
                                <label className="block font-semibold text-gray-700 mb-2">Correo</label>
                                <input
                                    type="email"
                                    name="correo"
                                    value={formData.correo}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                />
                            </div>

                            <div>
                                <label className="block font-semibold text-gray-700 mb-2">Rol</label>
                                <select
                                    name="rol"
                                    value={formData.rol}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                >
                                    <option>Administrador</option>
                                    <option>Usuario</option>
                                </select>
                            </div>

                            <div>
                                <label className="block font-semibold text-gray-700 mb-2">Estado</label>
                                <select
                                    name="estado"
                                    value={formData.estado}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                >
                                    <option>Activo</option>
                                    <option>Inactivo</option>
                                    <option>-</option>
                                </select>
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

export default LobbyAdmin;
