import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { useComerciosContext } from '../../context/UserContext';

const Productos = () => {
    const { nombreComercio } = useParams();
    const { comercios } = useComerciosContext();
    const [ comercio, setComercio] = useState("");
    
    useEffect(() =>{
        const comercioEncontrado = comercios.find(busqueda => busqueda.nombre === nombreComercio);
        if(comercioEncontrado !== undefined){
            setComercio(comercioEncontrado);
        }
    },[nombreComercio, comercios]);


    return(
        <div>
            <h2>{comercio.nombre}</h2>
        </div>
    );

}

export default Productos;