import React, { useState } from 'react';
import './EditarComercio.css'
import Mapa from '../../../Utilities/Mapa/Mapa'
import FileSelect from '../../../Utilities/FileSelect/FileSelect'
import { useUserContext } from '../../../context/UserContext';
import { getDatabase, ref, push, set, get, update } from 'firebase/database';
import { getStorage, ref as sRef ,uploadBytes, getDownloadURL } from 'firebase/storage';



const EditarComercio = () => {
  const [nombre, setNombre] = useState('');
  const [id, setId] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [logo, setLogo] = useState('');
  const [banner, setBanner] = useState('');
  const [conocenos, setConocenos] = useState('');
  const [caracteristicas, setCaracteristicas] = useState([]);
  const db = getDatabase();
  const storage = getStorage();
  const [upload, setUpload] = useState(0);
  const { user } = useUserContext();
  
  const agregarCaracteristica = (nuevaCaracteristica) => {
    const nuevasCaracteristicas = [...caracteristicas, nuevaCaracteristica];
    setCaracteristicas(nuevasCaracteristicas)
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
      if (banner !== '') {  
        const storageRef = sRef(storage, `usuarios/${user.uid}/comercios/${nombre}/banner`); 
        const uploadTaskSnapshot = await uploadBytes(storageRef, banner);
        const url = await getDownloadURL(uploadTaskSnapshot.ref);
        setBanner(url);
        console.log('Archivo banner subido correctamente');
      }
      
  
      if (logo !== '') {
        const storageRef = sRef(storage, `usuarios/${user.uid}/comercios/${nombre}/logo`); 
        const uploadTaskSnapshot = await uploadBytes(storageRef, logo);
        const url = await getDownloadURL(uploadTaskSnapshot.ref);
        setLogo(url);
        console.log('Archivo logo subido correctamente');
      }
      
      nuevoComercio();
      
    } catch (error) {
      console.error('Error al subir el archivo:', error);
      setError('Ocurrió un error al subir los archivos'); // Establecer un estado de error
    }
  };

  const nuevoComercio = async () => {
    setUpload(0);
    try {
      const comercioRef = ref(db, `usuarios/${user.uid}/comercios/${nombre}`);
      
      // Verificar si el comercio ya existe
      const snapshot = await get(comercioRef);
      if (snapshot.exists()) {

        await update(comercioRef, {
          nombre: nombre,
          id: id,
          ubicacion: ubicacion,
          telefono: telefono,
          logo: logo,
          banner: banner,
          conocenos: conocenos,
          caracteristicas: caracteristicas
        });
        console.log('Comercio actualizado exitosamente en Firebase Realtime Database');
      } else {
        const nuevoComercioRef = push(comercioRef);
        await set(nuevoComercioRef, {
          nombre: nombre,
          id: id,
          ubicacion: ubicacion,
          telefono: telefono,
          logo: logo,
          banner: banner,
          conocenos: conocenos,
          caracteristicas: caracteristicas
        });
        console.log('Comercio guardado exitosamente en Firebase Realtime Database');
      }
    } catch (error) {
      console.error('Error al guardar o actualizar el comercio en Firebase Realtime Database:', error);
    }
  }


  return (
    <div className='container'>
      <div className='containerOne'>
        <h2>Nombre</h2>
        <input type="text" placeholder="Nombre" onChange={handleChage(setNombre)}/>
        <h2>Identificador</h2>
        <input type="text" placeholder="/Nombre" onChange={handleChage(setId)}/>
        <h2>Mapa</h2>
        <Mapa/>
        
        <h2 className='telefono'>Telefono</h2>
        <input type="text" placeholder="Telefono" onChange={handleChage(setTelefono)}/>

    </div>
    <div className='containerTwo'>
        <h2>Banner</h2>
        <FileSelect onSelectedImage={bannerChange}/>
        <h2>Conocenos...</h2>
        <input type="text" placeholder="Escriba aqui..." className='inputTwo'/>

        <h2>Caracteristicas</h2>
        <p>Estas caracteristicas seran
        mostradas en el perfil del <br/>
        comercio
        </p>
        <div>
            <div className='containerCheckBox'>
                <input type="checkbox" id="vegano" name="vegano" className='miCheckBox'/>
                <label for="vegano" >Vegano</label> 
            </div>
        
            <div className='containerCheckBox'>
                <input type="checkbox" id="glutenFree" name="glutenFree" className='miCheckBox'/>
                <label for="glutenFree" >Gluten free</label> 
            </div>
        </div>
        <div>
            <div className='containerCheckBox'>
                <input type="checkbox" id="petFriendly" name="petFriendly" className='miCheckBox'/>
                <label for="petFriendly">Pet Friendly</label> 
            </div>
        
            <div className='containerCheckBox'>
                <input type="checkbox" id="wiFi" name="wiFi" className='miCheckBox'/>
                <label for="wiFi">Wi-Fi</label> 
            </div>
        </div>

    </div>
    <div className='containerTwo'>
        <h2>Logo</h2>
        <FileSelect onSelectedImage={logoChange}/>
        
        <button onClick={saveComercio}>Guardar</button>
      </div>
    </div>
  );
}

export default EditarComercio;