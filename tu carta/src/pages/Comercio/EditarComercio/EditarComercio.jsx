import React, { useState, useEffect } from 'react';
import './EditarComercio.css'
import Mapa from '../../../Utilities/Mapa/Mapa'
import FileSelect from '../../../Utilities/FileSelect/FileSelect'
import { useUserContext, useComerciosContext } from '../../../context/UserContext';
import { getDatabase, ref, push, set, get, update } from 'firebase/database';
import { getStorage, ref as sRef ,uploadBytes, getDownloadURL } from 'firebase/storage';
import { useParams, useNavigate } from 'react-router-dom';



const EditarComercio = () => {
  const [nombre, setNombre] = useState('');
  const [id, setId] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [logo, setLogo] = useState('prueba');
  const [banner, setBanner] = useState('prueba');
  const [conocenos, setConocenos] = useState('');
  const [caracteristicas, setCaracteristicas] = useState([]);
  const db = getDatabase();
  const storage = getStorage();
  const { user } = useUserContext();
  const navigate = useNavigate();

  const { comercios } = useComerciosContext();
  const { nombreComercio } = useParams();
  
  useEffect(() => {
    const comercioEncontrado = comercios.find(comercio => comercio.nombre === nombreComercio);
    
    if (comercioEncontrado !== undefined) {
      setNombre(comercioEncontrado.nombre);
      setId(comercioEncontrado.id);
      setUbicacion(comercioEncontrado.ubicacion);
      setTelefono(comercioEncontrado.telefono);
      setLogo(comercioEncontrado.logo);
      setBanner(comercioEncontrado.banner);
      setConocenos(comercioEncontrado.conocenos);
      setCaracteristicas(comercioEncontrado.caracteristicas);
    }
  }, [nombreComercio, comercios]);
  

  const mapChange  = (ubication) => { 
    const latLngString = ubication.lat() + ", " + ubication.lng();
    setUbicacion(latLngString);
    console.log("Ubicacion seleccionada: " + ubicacion);
  }


  const handleChage = (setState) => (event) => { 
    const value = event.target.value;
    setState(value);
  }

  const bannerChange = (image) => { 
    setBanner(image);
  }

  const logoChange = (image) => {
    setLogo(image);
  }

  const saveComercio = async () => {
    try {
      let bannerURL = '';
      let logoURL = '';
  
      if (banner !== '') {
        const storageRef = sRef(storage, `usuarios/${user.uid}/comercios/${nombre}/banner`);
        const uploadTaskSnapshot = await uploadBytes(storageRef, banner);
        bannerURL = await getDownloadURL(uploadTaskSnapshot.ref);
        console.log('Archivo banner subido correctamente');
      }
  
      if (logo !== '') {
        const storageRef = sRef(storage, `usuarios/${user.uid}/comercios/${nombre}/logo`);
        const uploadTaskSnapshot = await uploadBytes(storageRef, logo);
        logoURL = await getDownloadURL(uploadTaskSnapshot.ref);
        console.log('Archivo logo subido correctamente');
      }
  
      await nuevoComercio(bannerURL, logoURL);
  
    } catch (error) {
      console.error('Error al subir el archivo:', error);
      setError('Ocurrió un error al subir los archivos');
    }
  };

  const handleClick = () => {
    if(nombreComercio !== "nuevo"){
      navigate(`/opciones-comercio/${nombreComercio}`); // Navegar a la página anterior
    }
    else { 
      navigate(`/`);
    }
    
};
  
  const nuevoComercio = async (bannerURL, logoURL) => {
    try {
      const comercioRef = ref(db, `usuarios/${user.uid}/comercios/${nombre}`);
  
      const snapshot = await get(comercioRef);
      if (snapshot.exists()) {
        await update(comercioRef, {
          nombre: nombre,
          id: id,
          ubicacion: ubicacion,
          telefono: telefono,
          logo: logoURL,
          banner: bannerURL,
          conocenos: conocenos,
          caracteristicas: caracteristicas
        });
        console.log('Comercio actualizado exitosamente en Firebase Realtime Database');
      } else {
        await set(comercioRef, {
          nombre: nombre,
          id: id,
          ubicacion: ubicacion,
          telefono: telefono,
          logo: logoURL,
          banner: bannerURL,
          conocenos: conocenos,
          caracteristicas: caracteristicas
        });
        console.log('Comercio guardado exitosamente en Firebase Realtime Database');
      }
    } catch (error) {
      console.error('Error al guardar o actualizar el comercio en Firebase Realtime Database:', error);
    }
  };


  return (

    <div>
       <div className='atras'>
            <button onClick={handleClick}>Atras</button>
        </div>

        <div className='container'>
      <div className='containerOne'>
        <h2>Nombre</h2>
        <input value={nombre} type="text" placeholder="Nombre" onChange={handleChage(setNombre)}/>
        
        <h2>Identificador</h2>
        <input value={id} type="text" placeholder="/Nombre" onChange={handleChage(setId)}/> 
       
        <h2 >Telefono</h2>
        <input value={telefono} type="text" placeholder="Telefono" onChange={handleChage(setTelefono)}/>

        <h2>Conocenos...</h2>
        <input value={conocenos} type="text" placeholder="Escriba aqui..." className='inputTwo' onChange={handleChage(setConocenos)}/>

        <h2>Caracteristicas</h2>
        <p>Estas caracteristicas seran
        mostradas en el perfil del <br/>
        comercio
        </p>
        <div>
            <div className='containerCheckBox'>
                <input type="checkbox" id="vegano" name="vegano" className='miCheckBox' checked={caracteristicas.includes('vegano')} onChange={()=> agregarCaracteristica('vegano')}/>
                <label for="vegano" >Vegano</label> 
            </div>
        
            <div className='containerCheckBox'>
                <input type="checkbox" id="glutenFree" name="glutenFree" className='miCheckBox' checked={caracteristicas.includes('glutenFree')} onChange={()=> agregarCaracteristica('glutenFree')}/>
                <label for="glutenFree" >Gluten free</label> 
            </div>
        </div>
        <div>
            <div className='containerCheckBox'>
                <input type="checkbox" id="petFriendly" name="petFriendly" className='miCheckBox' checked={caracteristicas.includes('petFriendly')} onChange={()=> agregarCaracteristica('petFriendly')}/>
                <label for="petFriendly">Pet Friendly</label> 
            </div>
        
            <div className='containerCheckBox'>
                <input type="checkbox" id="wiFi" name="wiFi" className='miCheckBox' checked={caracteristicas.includes('wiFi')} onChange={()=> agregarCaracteristica('wiFi')}/>
                <label for="wiFi">Wi-Fi</label> 
            </div>
        </div>

    </div>
    <div className='containerTwo'>
        
        
        <h2>Mapa</h2>
        <Mapa onMapSelect={mapChange}/>
        <button onClick={saveComercio}>Guardar</button>

    </div>
    <div className='containerTwo'>
        <h2>Logo</h2>
        <FileSelect onSelectedImage={logoChange}/>

        <h2>Banner</h2>
        <FileSelect onSelectedImage={bannerChange}/>

        
      </div>
    </div>


    </div>
    
  );
}

export default EditarComercio;