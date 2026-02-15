function Header({titulo, tipoUsuario, onLogout}) {

    return (
        <div className="flex items-center px-4 sm:px-8 md:px-16 h-20 sm:h-24 md:h-28 border border-gray-300">
            <img
                className="h-24"
                src="/imagenes/logo2.png"
                alt="Logo del controlador de gastos" />


            <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold">
                {titulo}
            </h1>

            <div className="ml-auto flex items-center gap-3">
                <span className="bg-gray-300 text-gray-800 px-4 py-1 rounded-full text-xs font-semibold">
                    {tipoUsuario}
                </span>

                <button onClick={onLogout}
                    className="bg-red-500 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-red-600 transition">
                    Cerrar sesión
                </button>
            </div>
        </div>
    )

}

export default Header;