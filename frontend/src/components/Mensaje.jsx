function Mensaje ({msg, visible}){
    // Asegurar que msg es un string
    const mensaje = typeof msg === 'string' ? msg : 'Error desconocido';
    
    return visible 
        ?   <div className="text-red-500 font-bold text-center">
            {mensaje}
            </div>
        :   null;
}

export default Mensaje;