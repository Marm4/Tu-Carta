import React from 'react';
import './Home.css'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Comercios</h1>

      <div>

      </div>

      <Link to="/editar-comercio">
        <button className="agregar-button">Agregar comercio</button>
      </Link> 
      
      
    </div>
  );
}

export default Home;