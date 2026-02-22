function Header({titulo, tipoUsuario, onLogout}) {

    return (
        <div className="flex items-center px-3 sm:px-6 md:px-12 lg:px-16 h-16 sm:h-20 md:h-24 lg:h-28 border border-gray-300">
            <img
                className="h-12 sm:h-16 md:h-20 lg:h-24"
                src="/imagenes/logo2.png"
                alt="Logo del controlador de gastos" />


            <h1 className="absolute left-1/2 transform -translate-x-1/2 text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-center px-2">
                {titulo}
            </h1>

            <div className="ml-auto flex items-center gap-2 sm:gap-3">
                <span className="bg-gray-300 text-gray-800 px-2 sm:px-3 md:px-4 py-1 rounded-full text-[10px] sm:text-xs font-semibold">
                    {tipoUsuario}
                </span>

                <button onClick={onLogout}
                    className="bg-red-500 text-white px-3 sm:px-4 md:px-5 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold hover:bg-red-600 transition">
                    Cerrar sesión
                </button>
            </div>
        </div>
    )

}

export default Header;