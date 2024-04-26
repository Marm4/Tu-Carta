import React, { useState, useEffect } from 'react';
import './Comercios.css';
import { Link } from 'react-router-dom';
import { useUserContext, useComerciosContext } from '../../../context/UserContext';
import { getDatabase, ref, get } from 'firebase/database';
import CardComercio from './CardComercio/CardComercio'

const Comercios = () => {
  
  const { user } = useUserContext();
  const db = getDatabase();
  const { comercios, setComercios } = useComerciosContext();

  useEffect(() => {
    const fetchComercios = async () => {
      try {
        const comerciosRef = ref(db, `usuarios/${user.uid}/comercios`);
        const snapshot = await get(comerciosRef);

        const comerciosData = [];
        snapshot.forEach((childSnapshot) => {
          const comercio = childSnapshot.val();
          comerciosData.push(comercio);
          console.log("Comercio recuperado - Nombre:", comercio.nombre, "- Ubicación:", comercio.ubicacion);
        });

        setComercios(comerciosData);
        
      } catch (error) {
        console.error("Error al recuperar los comercios:", error);
      }
    };

    fetchComercios();
  }, [user.uid]); 

  return (

    <div>
      <div className='logout'>
      {user &&(
            <Link to="/logout" className="link">Logout</Link> 
          )}
      </div>
       

      <div className='comercios-container'>
            <h1>Comercios</h1>

            

            <div className='card-container'>
            {comercios.map((comercio, index) => (
              <Link to={`/opciones-comercio/${comercio.nombre}`} key={index}>
                <CardComercio comercio={comercio} />
              </Link>
            ))}
          </div>

            <Link to="/editar-comercio/nuevo">
              <button className="agregar-button">Agregar comercio</button>
            </Link> 
          </div>

      </div>


    
  );
}

export default Comercios;