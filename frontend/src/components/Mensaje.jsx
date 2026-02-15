function Mensaje ({msg, visible}){
    return visible 
        ?   <div className="text-red-500 font-bold text-center">
            {msg}
            </div>
        :   null;
}

export default Mensaje;