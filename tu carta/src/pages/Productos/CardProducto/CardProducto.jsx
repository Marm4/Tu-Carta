import React from 'react';
import './CardProducto.css';

const CardProducto = ({ producto }) =>{    
    return(
        <div className='card-producto-container'>
            <div className=' flex-row'>
            <div className='imagen-parameters'>
                <img src={producto.imagen} alt="Imagen del producto" />
            </div>
            <div>
                <h2 className='card-producto-nombre'>{producto.nombre}</h2>
                <p className='card-producto-descripcion'>{producto.descripcion}</p>
            </div>  
        </div>
        <div className='flex-row'>
            <p>${producto.precio}</p>
        </div>
        </div>
    )
}

export default CardProducto;