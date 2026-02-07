function VerUsuarios({ usuarios, onEditar, onEliminar }) {
  return (
    <div className="p-6 w-full flex justify-center">
      <div className="overflow-y-auto max-h-96 w-full max-w-5xl">
        <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">Nombre</th>
            <th className="border p-2 text-left">Correo</th>
            <th className="border p-2 text-left">Rol</th>
            <th className="border p-2 text-left">Estado</th>
            <th className="border p-2 text-center">Editar</th>
            <th className="border p-2 text-center">Eliminar</th>
          </tr>
        </thead>

        <tbody>
          {usuarios.length === 0 ? (
            <tr>
              <td colSpan="6" className="p-4 text-center text-gray-500">
                No hay usuarios registrados
              </td>
            </tr>
          ) : (
            usuarios.map((usuario) => (
              <tr key={usuario.id} className="border-t">
                <td className="border p-2">{usuario.nombre}</td>
                <td className="border p-2">{usuario.correo}</td>
                <td className="border p-2">{usuario.rol}</td>
                <td className="border p-2">{usuario.estado}</td>
                <td className="border p-2 text-center">
                  <button
                    onClick={() => onEditar(usuario)}
                    className="bg-yellow-500 text-black px-3 py-1 rounded hover:bg-yellow-600 transition font-semibold"
                  >
                    Editar
                  </button>
                </td>
                <td className="border p-2 text-center">
                  <button
                    onClick={() => onEliminar(usuario.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition font-semibold"
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
