import React, { useState, useEffect } from 'react';
import './CardComercio.css'

const CardComercio = ({ comercio }) => {
    const nombre = comercio.nombre;
    const logo = comercio.logo;
    const banner = comercio.banner;
    const [ dias, setDias ] =  useState('');
    const [ ubicacion, setUbicacion ] = useState('');
    const [ telefono, setTelefono ] = useState('');

  function capitalizeFirstLetter(texto) {
      if (!texto) return '';
      
      return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
  }

  useEffect(() => {
    obtenerDireccion(comercio.ubicacion);
    if (Array.isArray(comercio.diasLaborales) && comercio.diasLaborales.length > 0) {
      setDias("Martes a Domingos de 12:00 a 24:00");
    }
    if(comercio.telefono !== undefined){
      setTelefono(comercio.telefono);
    }
  }, [comercio.ubicacion, comercio.diasLaborales, comercio.telefono]);


  function obtenerDireccion(ubicacionStr) {
    const [latitudStr, longitudStr] = ubicacionStr.split(', ');
    const latitud = parseFloat(latitudStr);
    const longitud = parseFloat(longitudStr);
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitud},${longitud}&key=AIzaSyA-K5d6lI_KIjgS4LABdHqpXRvoYuJQvOs`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'OK' && data.results.length > 0) {
                const addressComponents = data.results[0].address_components;
                let ubicacionFinal = '';
                for (let component of addressComponents) {
                    if (component.types.includes('locality') || component.types.includes('administrative_area_level_1')) {
                        if (ubicacionFinal !== '') ubicacionFinal += ', ';
                        ubicacionFinal += component.long_name;

                    }
                }
                console.log(ubicacionFinal);
                setUbicacion(ubicacionFinal);
            } else {
                console.log('No se encontró ninguna dirección para las coordenadas proporcionadas.');
            }
        })
        .catch(error => {
            console.error('Error al obtener la dirección:', error);
        });
}
  return (
    <div className="general-container card">
      <div className='banner'>
        <img src={banner} alt="Banner del comercio" />
      </div>

      <div className='nombre-imagen-container'>
        <div className='logo-parameters'> 
          <img src={logo} alt="Logo del comercio" />
        </div>
        <div className='section-nombre-direccion'>
            <h2>{nombre}</h2>
            <div className='flex-row'>
              <div className='icon-location'/>
              <p>{ubicacion}</p>
            </div>
          </div>
      </div>
      <div className='features-container'>

          {dias !== '' ? 
            <div className='flex-row '>
              <div className='icon-time '/>
              <p>{dias}</p>
            </div>
            : 
            <div/>
          }
          {telefono !== '' ?
            <div className='flex-row '>
              <div className='icon-phone'/>
              <p>{telefono}</p>
            </div>
            :
            <p/>
          }
      </div>
      

      
      
      
      
      
    </div>
  );
};

export default CardComercio;