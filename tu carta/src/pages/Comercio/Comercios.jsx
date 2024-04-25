import React from 'react';
import './Comercios.css'
import { Link } from 'react-router-dom';

const Comercios = () => {
  return (
    <div className='comercios-container'>
      <h1>Comercios</h1>

      <div className='card-contianer'>
        
      </div>

      <Link to="/editar-comercio">
          <button className="agregar-button">Agregar comercio</button>
      </Link> 

    </div>
  );
}

export default Comercios;