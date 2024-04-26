import React, { useState, useEffect } from 'react';
import "./OpcionesComercio.css"
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useComerciosContext } from '../../../context/UserContext';


const OpcionesComercio = () => { 
    const { nombreComercio } = useParams();
    const { comercios } = useComerciosContext();
    const [ comercio, setComercio ] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const comercioEncontrado = comercios.find(busqueda => busqueda.nombre === nombreComercio);
        
        if (comercioEncontrado !== undefined) {
          setComercio(comercioEncontrado);
        }
        else{ 
            console.log("Ocurrio un error al cargar el comercio");
        }
      }, [nombreComercio, comercios]);

    
    const goBack = () => {
        navigate('/');
    };
    
    const goProductos = () => { 
        navigate(`/productos/${nombreComercio}`);
    };

    return(
        <div>

            <div className='atras'>
                <button onClick={goBack}>Atras</button>
            </div>

            <div className='opciones-container'>
                <div className='general-container datos-comercio'>
                    <h3>Logo</h3>

                    <Link className='link-decoration' to={`/editar-comercio/${nombreComercio}`}>
                    <div className='nombre-id'>
                    <h2>{comercio.nombre}</h2>
                        <p>{comercio.id}</p>
                    </div>
                    </Link>
                    
                    <h3>QR</h3>
                </div>

                <div className='platos'>
                    <button onClick={goProductos}>VER PLATOS</button>
                </div>    
            </div>
        </div>
        
    );
}

export default OpcionesComercio;