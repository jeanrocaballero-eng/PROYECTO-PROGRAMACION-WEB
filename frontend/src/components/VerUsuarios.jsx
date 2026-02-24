function VerUsuarios({ usuarios, onEditar, onEliminar }) {
  return (
    <div className="p-4 sm:p-6 w-full flex justify-center">
      <div className="overflow-y-auto max-h-96 w-full max-w-6xl">
        <table className="w-full border border-gray-300 text-sm sm:text-base">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">Nombre</th>
            <th className="border p-2 text-left">Email</th>
            <th className="border p-2 text-left">Rol</th>
            <th className="border p-2 text-left">Estado</th>
            <th className="border p-2 text-left">Fecha registro</th>
            <th className="border p-2 text-center">Editar</th>
            <th className="border p-2 text-center">Eliminar</th>
          </tr>
        </thead>

        <tbody>
          {usuarios.length === 0 ? (
            <tr>
              <td colSpan="7" className="p-4 text-center text-gray-500">
                No hay usuarios registrados
              </td>
            </tr>
          ) : (
            usuarios.map((usuario) => (
              <tr key={usuario.id} className="border-t">
                <td className="border p-2">{usuario.nombre}</td>
                <td className="border p-2">{usuario.email}</td>
                <td className="border p-2">{usuario.rol}</td>
                <td className="border p-2">{usuario.estado}</td>
                <td className="border p-2">{usuario.fecha_creacion ? new Date(usuario.fecha_creacion).toLocaleDateString() : "-"}</td>
                <td className="border p-2 text-center">
                  <button
                    onClick={() => onEditar(usuario)}
                    disabled={usuario.is_admin}
                    className={`px-3 py-1 rounded transition font-semibold ${usuario.is_admin ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-yellow-500 text-black hover:bg-yellow-600"}`}
                  >
                    Editar
                  </button>
                </td>
                <td className="border p-2 text-center">
                  <button
                    onClick={() => onEliminar(usuario.id)}
                    disabled={usuario.is_admin}
                    className={`px-3 py-1 rounded transition font-semibold ${usuario.is_admin ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-red-500 text-white hover:bg-red-600"}`}
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

export default VerUsuarios;
