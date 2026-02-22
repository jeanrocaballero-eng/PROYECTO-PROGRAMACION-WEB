import { useEffect, useState } from "react";
import CabeceraPaginasAdmin from "../components/CabeceraPaginasAdmin";
import usuariosService from "../services/usuariosService";

function GestionUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [error, setError] = useState("");

  // ======================
  // CARGAR USUARIOS
  // ======================
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

  // ======================
  // GUARDAR (CREAR / EDITAR)
  // ======================
  async function guardarUsuario() {
    try {
      if (editandoId) {
        await usuariosService.actualizarUsuario(editandoId, {
          nombre,
          email,
        });
      } else {
        await usuariosService.crearUsuario({
          nombre,
          email,
          contraseña: "123456", // contraseña por defecto
        });
      }

      setNombre("");
      setEmail("");
      setEditandoId(null);
      cargarUsuarios();
    } catch (err) {
      setError(err.message);
    }
  }

  // ======================
  // EDITAR
  // ======================
  function editarUsuario(usuario) {
    setNombre(usuario.nombre);
    setEmail(usuario.email);
    setEditandoId(usuario.id);
  }

  // ======================
  // ELIMINAR
  // ======================
  async function eliminarUsuario(id) {
    if (!confirm("¿Seguro que deseas eliminar este usuario?")) return;

    try {
      await usuariosService.eliminarUsuario(id);
      cargarUsuarios();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <CabeceraPaginasAdmin Titulo="Gestión de Usuarios" />

      <div className="p-6">

        {error && (
          <div className="bg-red-200 text-red-800 p-2 mb-4 rounded">
            {error}
          </div>
        )}

        {/* FORMULARIO */}
        <div className="mb-8 border p-4 rounded">
          <h2 className="text-lg font-semibold mb-4">
            {editandoId ? "Editar Usuario" : "Crear Usuario"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="border p-2 rounded"
            />

            <input
              type="email"
              placeholder="Correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 rounded"
            />

            <button
              onClick={guardarUsuario}
              className="bg-blue-600 text-white p-2 rounded col-span-1 md:col-span-2"
            >
              {editandoId ? "Actualizar Usuario" : "Guardar Usuario"}
            </button>

          </div>
        </div>

        {/* TABLA */}
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Nombre</th>
              <th className="border p-2 text-left">Correo</th>
              <th className="border p-2 text-center">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {usuarios.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center p-4">
                  No hay usuarios registrados
                </td>
              </tr>
            ) : (
              usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td className="border p-2">{usuario.nombre}</td>
                  <td className="border p-2">{usuario.email}</td>
                  <td className="border p-2 text-center space-x-2">
                    <button
                      onClick={() => editarUsuario(usuario)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => eliminarUsuario(usuario.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

      </div>
    </div>
  );
}

export default GestionUsuarios;
