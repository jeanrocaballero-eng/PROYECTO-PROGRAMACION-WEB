import CabeceraPaginasAdmin from "../components/CabeceraPaginasAdmin";

function GestionUsuarios() {
  return (
    <div>

      <CabeceraPaginasAdmin Titulo="Gestión de Usuarios" />

      <div className="p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-6">
        Gestión de Usuarios
      </h1>

      {/* Formulario */}
      <div className="mb-8 border p-4 rounded">
        <h2 className="text-lg font-semibold mb-4">
          Crear / Editar Usuario
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nombre"
            className="border p-2 rounded"
          />

          <input
            type="email"
            placeholder="Correo electrónico"
            className="border p-2 rounded"
          />

          <select className="border p-2 rounded">
            <option>Usuario</option>
          </select>

          <select className="border p-2 rounded">
            <option>Activo</option>
            <option>Inactivo</option>
          </select>

          <button
            type="button"
            className="bg-blue-600 text-white p-2 rounded col-span-1 md:col-span-2"
          >
            Guardar Usuario
          </button>
        </form>
      </div>

      {/* Tabla */}
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">Nombre</th>
            <th className="border p-2 text-left">Correo</th>
            <th className="border p-2 text-left">Rol</th>
            <th className="border p-2 text-left">Estado</th>
            <th className="border p-2 text-left">Acciones</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className="border p-2">Hernan Quintana</td>
            <td className="border p-2">hernanquint@gmail.com</td>
            <td className="border p-2 text-yellow-600 font-bold">Administrador</td>
            <td className="border p-2 text-yellow-600 font-bold">-</td>
            <td className="border p-2 space-x-2">
              
            </td>
          </tr>

          <tr className="bg-gray-50">
            <td className="border p-2">Jesus Pisconte</td>
            <td className="border p-2">jesuspisc@gmail.com</td>
            <td className="border p-2">Usuario</td>
            <td className="border p-2 text-red-600">Inactivo</td>
            <td className="border p-2 space-x-2">
              <button className="bg-yellow-500 text-white px-2 py-1 rounded">
                Editar
              </button>
              <button className="bg-red-600 text-white px-2 py-1 rounded">
                Eliminar
              </button>
            </td>
          </tr>

          <tr className="bg-gray-50">
            <td className="border p-2">Raul Quispe</td>
            <td className="border p-2">raulquisp@gmail.com</td>
            <td className="border p-2">Usuario</td>
            <td className="border p-2 text-green-600">Activo</td>
            <td className="border p-2 space-x-2">
              <button className="bg-yellow-500 text-white px-2 py-1 rounded">
                Editar
              </button>
              <button className="bg-red-600 text-white px-2 py-1 rounded">
                Eliminar
              </button>
            </td>
          </tr>

          <tr className="bg-gray-50">
            <td className="border p-2">Angelo Huarancca</td>
            <td className="border p-2">angelohuarancc@gmail.com</td>
            <td className="border p-2">Usuario</td>
            <td className="border p-2 text-green-600">Activo</td>
            <td className="border p-2 space-x-2">
              <button className="bg-yellow-500 text-white px-2 py-1 rounded">
                Editar
              </button>
              <button className="bg-red-600 text-white px-2 py-1 rounded">
                Eliminar
              </button>
            </td>
          </tr>

          <tr className="bg-gray-50">
            <td className="border p-2">Alenadro Pacheco</td>
            <td className="border p-2">alejandropachec@gmail.com</td>
            <td className="border p-2">Usuario</td>
            <td className="border p-2 text-green-600">Activo</td>
            <td className="border p-2 space-x-2">
              <button className="bg-yellow-500 text-white px-2 py-1 rounded">
                Editar
              </button>
              <button className="bg-red-600 text-white px-2 py-1 rounded">
                Eliminar
              </button>
            </td>
          </tr>

          <tr className="bg-gray-50">
            <td className="border p-2">Jeanpierr Rojas</td>
            <td className="border p-2">jeanpierrroj@gmail.com</td>
            <td className="border p-2">Usuario</td>
            <td className="border p-2 text-green-600">Activo</td>
            <td className="border p-2 space-x-2">
              <button className="bg-yellow-500 text-white px-2 py-1 rounded">
                Editar
              </button>
              <button className="bg-red-600 text-white px-2 py-1 rounded">
                Eliminar
              </button>
            </td>
          </tr>

          <tr className="bg-gray-50">
            <td className="border p-2">Claudia Sipion</td>
            <td className="border p-2">claudiasip@gmail.com</td>
            <td className="border p-2">Usuario</td>
            <td className="border p-2 text-red-600">Inactivo</td>
            <td className="border p-2 space-x-2">
              <button className="bg-yellow-500 text-white px-2 py-1 rounded">
                Editar
              </button>
              <button className="bg-red-600 text-white px-2 py-1 rounded">
                Eliminar
              </button>
            </td>
          </tr>

          <tr className="bg-gray-50">
            <td className="border p-2">Pedro Pascal</td>
            <td className="border p-2">pedropasc@gmail.com</td>
            <td className="border p-2">Usuario</td>
            <td className="border p-2 text-red-600">Inactivo</td>
            <td className="border p-2 space-x-2">
              <button className="bg-yellow-500 text-white px-2 py-1 rounded">
                Editar
              </button>
              <button className="bg-red-600 text-white px-2 py-1 rounded">
                Eliminar
              </button>
            </td>
          </tr>

          <tr className="bg-gray-50">
            <td className="border p-2">Mark Hamill</td>
            <td className="border p-2">markham@gmail.com</td>
            <td className="border p-2">Usuario</td>
            <td className="border p-2 text-red-600">Inactivo</td>
            <td className="border p-2 space-x-2">
              <button className="bg-yellow-500 text-white px-2 py-1 rounded">
                Editar
              </button>
              <button className="bg-red-600 text-white px-2 py-1 rounded">
                Eliminar
              </button>
            </td>
          </tr>

          <tr className="bg-gray-50">
            <td className="border p-2">Carrie Fisher</td>
            <td className="border p-2">carriefish@gmail.com</td>
            <td className="border p-2">Usuario</td>
            <td className="border p-2 text-red-600">Inactivo</td>
            <td className="border p-2 space-x-2">
              <button className="bg-yellow-500 text-white px-2 py-1 rounded">
                Editar
              </button>
              <button className="bg-red-600 text-white px-2 py-1 rounded">
                Eliminar
              </button>
            </td>
          </tr>

          <tr className="bg-gray-50">
            <td className="border p-2">Harrison Ford</td>
            <td className="border p-2">harrisonf@gmail.com</td>
            <td className="border p-2">Usuario</td>
            <td className="border p-2 text-green-600">Activo</td>
            <td className="border p-2 space-x-2">
              <button className="bg-yellow-500 text-white px-2 py-1 rounded">
                Editar
              </button>
              <button className="bg-red-600 text-white px-2 py-1 rounded">
                Eliminar
              </button>
            </td>
          </tr>

          <tr className="bg-gray-50">
            <td className="border p-2">Hayden Christensen</td>
            <td className="border p-2">haydenchris@gmail.com</td>
            <td className="border p-2">Usuario</td>
            <td className="border p-2 text-green-600">Activo</td>
            <td className="border p-2 space-x-2">
              <button className="bg-yellow-500 text-white px-2 py-1 rounded">
                Editar
              </button>
              <button className="bg-red-600 text-white px-2 py-1 rounded">
                Eliminar
              </button>
            </td>
          </tr>

          <tr className="bg-gray-50">
            <td className="border p-2">Ewan McGregor</td>
            <td className="border p-2">ewanmcgreg@gmail.com</td>
            <td className="border p-2">Usuario</td>
            <td className="border p-2 text-green-600">Activo</td>
            <td className="border p-2 space-x-2">
              <button className="bg-yellow-500 text-white px-2 py-1 rounded">
                Editar
              </button>
              <button className="bg-red-600 text-white px-2 py-1 rounded">
                Eliminar
              </button>
            </td>
          </tr>

          <tr className="bg-gray-50">
            <td className="border p-2">Natalie Portman</td>
            <td className="border p-2">natalieport@gmail.com</td>
            <td className="border p-2">Usuario</td>
            <td className="border p-2 text-green-600">Activo</td>
            <td className="border p-2 space-x-2">
              <button className="bg-yellow-500 text-white px-2 py-1 rounded">
                Editar
              </button>
              <button className="bg-red-600 text-white px-2 py-1 rounded">
                Eliminar
              </button>
            </td>
          </tr>

          <tr className="bg-gray-50">
            <td className="border p-2">Patricia Stuart</td>
            <td className="border p-2">patriciastu@gmail.com</td>
            <td className="border p-2">Usuario</td>
            <td className="border p-2 text-green-600">Activo</td>
            <td className="border p-2 space-x-2">
              <button className="bg-yellow-500 text-white px-2 py-1 rounded">
                Editar
              </button>
              <button className="bg-red-600 text-white px-2 py-1 rounded">
                Eliminar
              </button>
            </td>
          </tr>

          <tr className="bg-gray-50">
            <td className="border p-2">Nadia Rodriguez</td>
            <td className="border p-2">nadiarodrig@gmail.com</td>
            <td className="border p-2">Usuario</td>
            <td className="border p-2 text-green-600">Activo</td>
            <td className="border p-2 space-x-2">
              <button className="bg-yellow-500 text-white px-2 py-1 rounded">
                Editar
              </button>
              <button className="bg-red-600 text-white px-2 py-1 rounded">
                Eliminar
              </button>
            </td>
          </tr>

          <tr className="bg-gray-50">
            <td className="border p-2">Oscar Quezada</td>
            <td className="border p-2">oscarquez@gmail.com</td>
            <td className="border p-2">Usuario</td>
            <td className="border p-2 text-green-600">Activo</td>
            <td className="border p-2 space-x-2">
              <button className="bg-yellow-500 text-white px-2 py-1 rounded">
                Editar
              </button>
              <button className="bg-red-600 text-white px-2 py-1 rounded">
                Eliminar
              </button>
            </td>
          </tr>

          <tr className="bg-gray-50">
            <td className="border p-2">Jim Dios</td>
            <td className="border p-2">jimdiosc@gmail.com</td>
            <td className="border p-2">Usuario</td>
            <td className="border p-2 text-green-600">Activo</td>
            <td className="border p-2 space-x-2">
              <button className="bg-yellow-500 text-white px-2 py-1 rounded">
                Editar
              </button>
              <button className="bg-red-600 text-white px-2 py-1 rounded">
                Eliminar
              </button>
            </td>
          </tr>

          <tr className="bg-gray-50">
            <td className="border p-2">Antonio Pinilla</td>
            <td className="border p-2">antoniopin@gmail.com</td>
            <td className="border p-2">Usuario</td>
            <td className="border p-2 text-green-600">Activo</td>
            <td className="border p-2 space-x-2">
              <button className="bg-yellow-500 text-white px-2 py-1 rounded">
                Editar
              </button>
              <button className="bg-red-600 text-white px-2 py-1 rounded">
                Eliminar
              </button>
            </td>
          </tr>
         
        </tbody>
      </table>
    </div>
    </div>
    
  );
}

export default GestionUsuarios;
