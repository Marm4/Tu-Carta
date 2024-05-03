import React, { useState, useEffect } from 'react';
import './Comercios.css';
import { Link } from 'react-router-dom';
import { useUserContext, useComerciosContext } from '../../../context/UserContext';
import { getDatabase, ref, get } from 'firebase/database';
import CardComercio from './CardComercio/CardComercio'
import { getStorage, ref as sRef, getDownloadURL } from 'firebase/storage';

const Comercios = () => {
  const { user } = useUserContext();
  const db = getDatabase();
  const { comercios, setComercios } = useComerciosContext();
  const [dataLoadead, setDataLoadead] = useState(false);


  useEffect(() => {
    const fetchComercios = async () => {
      try {
        const comerciosRef = ref(db, `usuarios/${user.uid}/comercios`);
        const snapshot = await get(comerciosRef);


        const comerciosData = [];
        snapshot.forEach((childSnapshot) => {
          const comercio = childSnapshot.val();
          comerciosData.push(comercio);
          console.log("Comercio recuperado - Nombre:", comercio.nombre);
        });

        setComercios(comerciosData);
        setDataLoadead(true);
        
        
      } catch (error) {
        console.error("Error al recuperar los comercios:", error);
      }
    };

    fetchComercios();
  }, [user.uid]); 


  

  return (

    <div>

      <div className='comercios-container'>
            

            {dataLoadead ? 
              <div className='card-container'>
                {comercios.map((comercio, index) => (
                    <Link className="no-text-decoration" to={`/opciones-comercio/${comercio.id}`} key={index}>
                      <CardComercio comercio={comercio} />
                    </Link>
                          
                ))}
                
                <Link to="/editar-comercio/nuevo">
                  <div className='card'>
                    <div className='fa--plus'></div>
                    </div>                          
                </Link> 
              </div>
              :
              <div className='card-container spacing'>
                
                <div className='card2'/>
                <div className='card2'/>
                <div className='card2'/>
                

              </div>
            
            }

          </div>

      </div>


    
  );
}

export default Comercios;