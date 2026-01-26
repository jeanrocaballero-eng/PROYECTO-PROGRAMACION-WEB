function VerUsuarios() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Lista de Usuarios
      </h1>

      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">Nombre</th>
            <th className="border p-2 text-left">Correo</th>
            <th className="border p-2 text-left">Rol</th>
            <th className="border p-2 text-left">Estado</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className="border p-2">Juan Pérez</td>
            <td className="border p-2">juan@correo.com</td>
            <td className="border p-2">Administrador</td>
            <td className="border p-2 text-green-600">Activo</td>
          </tr>

          <tr className="bg-gray-50">
            <td className="border p-2">María López</td>
            <td className="border p-2">maria@correo.com</td>
            <td className="border p-2">Usuario</td>
            <td className="border p-2 text-red-600">Inactivo</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default VerUsuarios;
