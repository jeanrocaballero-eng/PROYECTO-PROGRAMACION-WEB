import CabeceraPaginasAdmin from "../components/CabeceraPaginasAdmin";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PanelLateralAdmin from "../components/PanelLateralAdmin";
function HistorialAdmin(){

    const navigate = useNavigate();

  
    return (
    <div>
        <CabeceraPaginasAdmin Titulo="Historial de Acceso de Usuarios" />
        <div className="flex">
            <PanelLateralAdmin/>

            {/* Tabla de accesos usuarios */}
            <table className="w-full border border-gray-300 mx-60 mt-20">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2 text-left">Usuario</th>
                        <th className="border p-2 text-left">Correo</th>
                        <th className="border p-2 text-left">Último acceso</th>
                    </tr>
                </thead>

                <tbody>

                    <tr className="bg-gray-50">
                        <td className="border p-2">Jesus Pisconte</td>
                        <td className="border p-2">jesuspisc@gmail.com</td>
                        <td className="border p-2">22-01-2026 19:00</td>
                    </tr>

                    <tr className="bg-gray-50">
                        <td className="border p-2">Raul Quispe</td>
                        <td className="border p-2">raulquisp@gmail.com</td>
                        <td className="border p-2">12-01-2026 09:00</td>
                    </tr>

                    <tr className="bg-gray-50">
                        <td className="border p-2">Angelo Huarancca</td>
                        <td className="border p-2">angelohuarancc@gmail.com</td>
                        <td className="border p-2">05-01-2026 14:00</td>
                    </tr>

                    <tr className="bg-gray-50">
                        <td className="border p-2">Alejandro Pacheco</td>
                        <td className="border p-2">alejandropachec@gmail.com</td>
                        <td className="border p-2">30-12-2025 13:00</td>
                    </tr>

                    <tr className="bg-gray-50">
                        <td className="border p-2">Jeanpierr Rojas</td>
                        <td className="border p-2">jeanpierrroj@gmail.com</td>
                        <td className="border p-2">23-12-2025 12:00</td>
                    </tr>

                    <tr className="bg-gray-50">
                        <td className="border p-2">Claudia Sipion</td>
                        <td className="border p-2">claudiasip@gmail.com</td>
                        <td className="border p-2">16-12-2025 17:00</td>
                    </tr>

                    <tr className="bg-gray-50">
                        <td className="border p-2">Pedro Pascal</td>
                        <td className="border p-2">pedropasc@gmail.com</td>
                        <td className="border p-2">14-12-2025 10:00</td>
                    </tr>

                    <tr className="bg-gray-50">
                        <td className="border p-2">Mark Hamill</td>
                        <td className="border p-2">markham@gmail.com</td>
                        <td className="border p-2">12-12-2025 22:00</td>
                    </tr>

                    <tr className="bg-gray-50">
                        <td className="border p-2">Carrie Fisher</td>
                        <td className="border p-2">carriefish@gmail.com</td>
                        <td className="border p-2">12-12-2025 15:00</td>
                    </tr>

            </tbody>
            </table>
        </div>
    </div>)
    }
export default HistorialAdmin;