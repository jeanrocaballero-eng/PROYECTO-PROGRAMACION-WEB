import CabeceraPaginasAdmin from "../components/CabeceraPaginasAdmin";
import { useNavigate } from "react-router-dom";
import PanelLateralAdmin from "../components/PanelLateralAdmin";

function HistorialAdmin() {

    const navigate = useNavigate();

    return (
        <div>
            <CabeceraPaginasAdmin Titulo="Historial de Acceso de Usuarios" />

            <div className="flex w-full">
                <PanelLateralAdmin />

                <table className="table-fixed border border-gray-300 ml-32 mt-10">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2 text-left w-10">Usuario</th>
                            <th className="border p-2 text-left w-10">Correo</th>
                            <th className="border p-2 text-center w-10">Último acceso</th>
                            <th className="border p-2 text-center w-5">Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr className="bg-gray-50">
                            <td className="border p-2 w-56 truncate" title="Jesus Pisconte">
                                Jesus Pisconte
                            </td>
                            <td className="border p-2 w-64 truncate" title="jesuspisc@gmail.com">
                                jesuspisc@gmail.com
                            </td>
                            <td className="border p-2 w-48 text-center">
                                22-01-2026 19:00
                            </td>
                            <td className="border p-2 w-32 text-center">
                                <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded">
                                    Auditar
                                </button>
                            </td>
                        </tr>

                        <tr className="bg-gray-50">
                            <td className="border p-2 w-56 truncate" title="Raul Quispe">
                                Raul Quispe
                            </td>
                            <td className="border p-2 w-64 truncate" title="raulquisp@gmail.com">
                                raulquisp@gmail.com
                            </td>
                            <td className="border p-2 w-48 text-center">
                                12-01-2026 09:00
                            </td>
                            <td className="border p-2 w-32 text-center">
                                <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded">
                                    Auditar
                                </button>
                            </td>
                        </tr>

                        <tr className="bg-gray-50">
                            <td className="border p-2 w-56 truncate" title="Angelo Huarancca">
                                Angelo Huarancca
                            </td>
                            <td className="border p-2 w-64 truncate" title="angelohuarancc@gmail.com">
                                angelohuarancc@gmail.com
                            </td>
                            <td className="border p-2 w-48 text-center">
                                05-01-2026 14:00
                            </td>
                            <td className="border p-2 w-32 text-center">
                                <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded">
                                    Auditar
                                </button>
                            </td>
                        </tr>

                        <tr className="bg-gray-50">
                            <td className="border p-2 w-56 truncate" title="Alejandro Pacheco">
                                Alejandro Pacheco
                            </td>
                            <td className="border p-2 w-64 truncate" title="alejandropachec@gmail.com">
                                alejandropachec@gmail.com
                            </td>
                            <td className="border p-2 w-48 text-center">
                                30-12-2025 13:00
                            </td>
                            <td className="border p-2 w-32 text-center">
                                <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded">
                                    Auditar
                                </button>
                            </td>
                        </tr>

                        <tr className="bg-gray-50">
                            <td className="border p-2 w-56 truncate" title="Jeanpierr Rojas">
                                Jeanpierr Rojas
                            </td>
                            <td className="border p-2 w-64 truncate" title="jeanpierrroj@gmail.com">
                                jeanpierrroj@gmail.com
                            </td>
                            <td className="border p-2 w-48 text-center">
                                23-12-2025 12:00
                            </td>
                            <td className="border p-2 w-32 text-center">
                                <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded">
                                    Auditar
                                </button>
                            </td>
                        </tr>

                        <tr className="bg-gray-50">
                            <td className="border p-2 w-56 truncate" title="Claudia Sipion">
                                Claudia Sipion
                            </td>
                            <td className="border p-2 w-64 truncate" title="claudiasip@gmail.com">
                                claudiasip@gmail.com
                            </td>
                            <td className="border p-2 w-48 text-center">
                                16-12-2025 17:00
                            </td>
                            <td className="border p-2 w-32 text-center">
                                <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded">
                                    Auditar
                                </button>
                            </td>
                        </tr>

                        <tr className="bg-gray-50">
                            <td className="border p-2 w-56 truncate" title="Pedro Pascal">
                                Pedro Pascal
                            </td>
                            <td className="border p-2 w-64 truncate" title="pedropasc@gmail.com">
                                pedropasc@gmail.com
                            </td>
                            <td className="border p-2 w-48 text-center">
                                14-12-2025 10:00
                            </td>
                            <td className="border p-2 w-32 text-center">
                                <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded">
                                    Auditar
                                </button>
                            </td>
                        </tr>

                        <tr className="bg-gray-50">
                            <td className="border p-2 w-56 truncate" title="Mark Hamill">
                                Mark Hamill
                            </td>
                            <td className="border p-2 w-64 truncate" title="markham@gmail.com">
                                markham@gmail.com
                            </td>
                            <td className="border p-2 w-48 text-center">
                                12-12-2025 22:00
                            </td>
                            <td className="border p-2 w-32 text-center">
                                <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded">
                                    Auditar
                                </button>
                            </td>
                        </tr>

                        <tr className="bg-gray-50">
                            <td className="border p-2 w-56 truncate" title="Carrie Fisher">
                                Carrie Fisher
                            </td>
                            <td className="border p-2 w-64 truncate" title="carriefish@gmail.com">
                                carriefish@gmail.com
                            </td>
                            <td className="border p-2 w-48 text-center">
                                12-12-2025 15:00
                            </td>
                            <td className="border p-2 w-32 text-center">
                                <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded">
                                    Auditar
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default HistorialAdmin;
