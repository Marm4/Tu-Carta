import React, { useState, useEffect } from 'react';
import "./OpcionesComercio.css"
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useComerciosContext } from '../../../context/UserContext';
import QRCode from 'qrcode.react';


const OpcionesComercio = () => { 
    const { nombreComercio } = useParams();
    const { comercios } = useComerciosContext();
    const [ comercio, setComercio ] = useState("");
    const [logo, setLogo] = useState('');
    const navigate = useNavigate();
    const [enlace, setEnlace] = useState("");

    useEffect(() => {
        const comercioEncontrado = comercios.find(busqueda => busqueda.id === nombreComercio);
        
        if (comercioEncontrado !== undefined) {
          setComercio(comercioEncontrado);
          if(comercioEncontrado.logo !== undefined){
            setLogo(comercioEncontrado.logo);
            setEnlace(`http://www.tucarta.com/${comercioEncontrado.identificador}`)
          }
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

    function capitalizeFirstLetter(texto) {
        if (!texto) return '';
        return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
    }

    return(
        <div>

            <div className='atras'>
                <button onClick={goBack}>Atras</button>
            </div>

            <div className='opciones-container'>
                <div className='general-container datos-comercio'>
                    <div className='logo-opciones-container'>
                        <img src={logo} alt="Logo del comercio"  />
                    </div>
                    
            
                    <Link className='link-decoration' to={`/editar-comercio/${nombreComercio}`}>
                        <div className='nombre-id'>
                        <h2>{capitalizeFirstLetter(comercio.nombre)}</h2>
                        <p>TuCarta.com/{capitalizeFirstLetter(comercio.identificador)}</p>    
                        </div>
                    </Link>
                   
                    <QRCode value={enlace} size={90} />
                   
                    
                </div>

                <div className='platos'>
                    <button onClick={goProductos}>VER PLATOS</button>
                </div>    
            </div>
        </div>
        
    );
}

export default OpcionesComercio;