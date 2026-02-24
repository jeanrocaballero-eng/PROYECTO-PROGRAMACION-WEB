import CabeceraPaginasAdmin from "../components/CabeceraPaginasAdmin";
import { useNavigate } from "react-router-dom";
import Sidebar_admin from "../components/Sidebar_admin";
import { useEffect, useState } from "react";
import { getUltimoAccesoUsuarios } from "../services/adminService";

function HistorialAdmin() {
  const navigate = useNavigate();
  const [accesos, setAccesos] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getUltimoAccesoUsuarios();
        setAccesos(data.items || []);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return (
    <div>
      <CabeceraPaginasAdmin Titulo="Historial de Acceso de Usuarios" />

      <div className="flex flex-col md:flex-row w-full">
        <Sidebar_admin />

        <div className="flex-1 overflow-x-auto px-4 md:px-0 mt-4 md:mt-0">
          <table className="w-full table-auto border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">Usuario</th>
                <th className="border p-2 text-left">Correo</th>
                <th className="border p-2 text-center">Último acceso</th>
              </tr>
            </thead>

            <tbody>
              {accesos.map((u) => (
                <tr key={u.user_id || u.email}>
                  <td className="border p-2">{u.nombre}</td>
                  <td className="border p-2">{u.email}</td>
                  <td className="border p-2 text-center">
                    {u.ultimo_acceso ? new Date(u.ultimo_acceso).toLocaleString() : "Nunca"}
                  </td>
                </tr>
              ))}

              {accesos.length === 0 && (
                <tr>
                  <td className="border p-4 text-center" colSpan={4}>
                    No hay registros
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default HistorialAdmin;