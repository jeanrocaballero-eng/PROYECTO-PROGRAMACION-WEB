import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ListadoEgresosUser from "../components/ListadoEgresosUser";
 
function LobbyUSER() {

    const navigate = useNavigate();
    
    const handleLogout = () => {
        navigate("/LoginPage");
    };


    const [egresos, setEgresos] = useState([
        {
            id: 1,
            fecha: "2025-10-08",
            descripcion: "Supermercado",
            categoria: "Alimentos",
            monto: 120
        },
        {
            id: 2,
            fecha: "2025-10-10",
            descripcion: "Internet",
            categoria: "Servicios",
            monto: 80
        },
        {
            id: 3,
            fecha: "2026-01-15",
            descripcion: "Libros",
            categoria: "Educación",
            monto: 70
        },
        {
            id: 4,
            fecha: "2026-01-25",
            descripcion: "Almuerzo",
            categoria: "Alimentos",
            monto: 25
        },
        {
            id: 5,
            fecha: "2026-02-01",
            descripcion: "Gasolina",
            categoria: "Transporte",
            monto: 60
        },
        {
            id: 6,
            fecha: "2026-02-03",
            descripcion: "Cine",
            categoria: "Entretenimiento",
            monto: 35
        },
        {
            id: 7,
            fecha: "2026-02-05",
            descripcion: "Ropa",
            categoria: "Compras",
            monto: 150
        },
        {
            id: 8,
            fecha: "2026-02-10",
            descripcion: "Electricidad",
            categoria: "Servicios",
            monto: 95
        },
        {
            id: 9,
            fecha: "2026-02-12",
            descripcion: "Consulta médica",
            categoria: "Salud",
            monto: 120
        },
        {
            id: 10,
            fecha: "2026-02-15",
            descripcion: "Café",
            categoria: "Alimentos",
            monto: 8
        },
        {
            id: 11,
            fecha: "2026-02-18",
            descripcion: "Taxi",
            categoria: "Transporte",
            monto: 22
        },
        {
            id: 12,
            fecha: "2026-02-20",
            descripcion: "Suscripción streaming",
            categoria: "Entretenimiento",
            monto: 15
        },
        {
            id: 13,
            fecha: "2026-02-26",
            descripcion: "Agua",
            categoria: "Servicios",
            monto: 95
        }
    ]);

    return (
        <div>
            {/* Enacabezado */}
            <div className="flex shadow-lg items-center px-4 sm:px-8 md:px-16 h-20 sm:h-24 md:h-28">
                <img 
                className="h-24" 
                src="/imagenes/logo2.png" 
                alt="Logo del controlador de gastos"/>
                

                <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold">
                    MIS EGRESOS
                </h1>

                <div className="ml-auto flex items-center gap-3">
                    <span className="bg-gray-300 text-gray-800 px-4 py-1 rounded-full text-xs font-semibold">
                        USER
                    </span>

                    <button onClick={handleLogout}
                     className="bg-red-500 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-red-600 transition">
                        Cerrar sesión
                    </button>
                </div>
            </div>

            {/* Botones  */}
            <div className="flex">

                <aside className="w-full md:w-60 p-4 md:p-6 border-r-0 md:border-r-4 flex flex-col gap-4 shadow-r">
                    
                    <button 
                        onClick={() => navigate("/RegistrarEgreso")}
                        className="bg-black text-white p-2 rounded-3xl mt-10 font-bold text-sm mb-3 hover:bg-gray-700 transition">
                        REGISTRAR
                    </button>

                    <button 
                        onClick={() => navigate("/EditarEgreso")}
                        className="bg-yellow-500 text-black p-2 rounded-3xl mt-4 font-bold text-sm mb-3 hover:bg-yellow-600 transition">
                        EDITAR
                    </button>

                    <button 
                        onClick={() => navigate("/ExportarEgresos")}
                        className="bg-purple-500 text-white p-2 rounded-3xl mt-4 font-bold text-sm mb-3 hover:bg-purple-600 transition">
                        EXPORTAR
                    </button>

                    <button 
                        onClick={() => navigate("/EliminarEgreso")}
                        className="bg-red-500 text-white p-2 rounded-3xl mt-4 font-bold text-sm mb-52 hover:bg-red-600 transition">
                        ELIMINAR
                    </button>

                    <a 
                        onClick={() => navigate("/CambiarContraseña")}
                        className="text-sm font-bold hover:text-blue-900 ml-3 mb-12 transition cursor-pointer"
                    >CAMBIAR CONTRASEÑA</a>

                </aside>

            {/* Filtro y tabla de egresos */}
                <div className="flex flex-col sm:flex-row items-start gap-2 mt-10 h-auto sm:h-10 ml-4 px-4 md:px-0">
                    <span className="font-semibold p-1 text-xl">
                        Filtrar por:
                    </span>

                    <select className="bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 text-md focus:outline-none focus:ring-2 focus:ring-yellow-400">
                        <option>Monto</option>
                        <option>Categoría</option>
                        <option>Fecha</option>
                    </select>

                    <button className="bg-gray-300 text-black p-2 rounded-3xl font-bold text-s hover:bg-gray-400 transition ">
                        Aplicar
                    </button>
                </div>

                <div className="flex-1 px-4 md:px-10 mt-16">
                    <ListadoEgresosUser egresos={egresos} />
                </div>
            </div>
        </div>
    );
}

export default LobbyUSER;