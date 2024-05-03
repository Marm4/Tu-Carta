import React, { useState, useEffect } from 'react';
import './EditarComercio.css'
import Mapa from '../../../Utilities/Mapa/Mapa'
import FileSelect from '../../../Utilities/FileSelect/FileSelect'
import { useUserContext, useComerciosContext } from '../../../context/UserContext';
import { getDatabase, ref, set, push, get, update } from 'firebase/database';
import { getStorage, ref as sRef ,uploadBytes, getDownloadURL } from 'firebase/storage';
import { useParams, useNavigate } from 'react-router-dom';
import GuardarComercio from '../GuardarComercio/GuardarComercio';



const EditarComercio = () => {
  const [nombre, setNombre] = useState('');
  const [nombreError, setNombreError] = useState(false);
  const [identificador, setIdentificador] = useState('');
  const [identificadorError, setIdentificadorError] = useState(false)
  const [ubicacion, setUbicacion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [logo, setLogo] = useState('');
  const [banner, setBanner] = useState('');
  const [conocenos, setConocenos] = useState('');
  const [caracteristicas, setCaracteristicas] = useState([]);
  const db = getDatabase();
  const { user } = useUserContext();
  const navigate = useNavigate();
  const [nombreRegistrado, setNombreRegistrado] = useState('');
  const [comerciosRegistrados, setComerciosRegistrados] = useState([]);
  const { comercios } = useComerciosContext();
  const { nombreComercio } = useParams();
  const [showPopup, setShowPopup] = useState(false);
  const guardarComercio = GuardarComercio();
  const [ diasLaborales, setDiasLaborales] = useState([]);
 


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
  
  useEffect(() => {
    const comercioEncontrado = comercios.find(comercio => comercio.id === nombreComercio);
    
    if (comercioEncontrado !== undefined) {
      setNombre(comercioEncontrado.nombre);
      setIdentificador(comercioEncontrado.identificador);
      setUbicacion(comercioEncontrado.ubicacion);
      
      setTelefono(comercioEncontrado.telefono);
      if(comercioEncontrado.logo !== undefined){
        setLogo("existente");
      }
      if(comercioEncontrado.banner !== undefined){
        setBanner("existente")
      }
      setConocenos(comercioEncontrado.conocenos);
      if(comercioEncontrado.caracteristica !== undefined){
        setCaracteristicas(comercioEncontrado.caracteristicas);
      }
      if(comercioEncontrado.diasLaborales !== undefined){
        setDiasLaborales(comercioEncontrado.diasLaborales);
      }
      
    }

    const fetchComercios = async () => {
      try {
        const comercioRegistradossRef = ref(db, `/comercios-registrados`);
        const snapshot = await get(comercioRegistradossRef);
  
        const comerciosRegistradosData = [];
        snapshot.forEach((childSnapshot) => {
          const comercioRegistrado = childSnapshot.val();
          comerciosRegistradosData.push(comercioRegistrado);
          console.log("Comercio encontrado: " +  comercioRegistrado.nombre);
        });
  
        setComerciosRegistrados(comerciosRegistradosData);
        
      } catch (error) {
        console.error("Error al recuperar los comercios:", error);
      }
    };
  
    fetchComercios();

  }, [nombreComercio, comercios]);


  useEffect(() => {
    
  }, [user.uid]); 
  

  const mapChange  = (ubication) => { 
    const latLngString = ubication.lat() + ", " + ubication.lng();
    setUbicacion(latLngString);
    console.log("Ubicacion seleccionada: " + ubicacion);
  }


  const handleChage = (setState) => (event) => { 
    const value = event.target.value;
    setState(value);
    if(setState === setNombre || setState === setIdentificador){
      let regex;
      if(setState === setNombre){
        regex = /^[a-zA-Z0-9\- ]+$/;
        if(value.length === 0){
          setNombreError(false);
          return;
        }
        setNombreError(false);
        if(!regex.test(value)){
          setNombreError(true);
        }
        return;
      }
      else if(setState === setIdentificador){
        regex = /^[a-zA-Z0-9\-]+$/;
        if(value.length === 0){
          setIdentificadorError(false);
          return;
        }
        setIdentificadorError(false);
        if(!regex.test(value)){
          setIdentificadorError(true); 
        }
        return;
      }
      
    }
    
  }

  const bannerChange = (image) => { 
    setBanner(image);
  }

  const logoChange = (image) => {
    setLogo(image);
  }


  const agregarDiaLaboral = (dia) => {
    if(diasLaborales.includes(dia)){
      setDiasLaborales(diasLaborales.filter(item => item !== dia));
    }
    else{
      setDiasLaborales([...diasLaborales, dia]);
    }
  };
 

  const agregarCaracteristica = (caracteristica) => {
   
    if (caracteristicas.includes(caracteristica)) {
      setCaracteristicas(caracteristicas.filter(item => item !== caracteristica));
     
    } else {
  
      setCaracteristicas([...caracteristicas, caracteristica]);
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


const validarInformacion = async () => {
  try{
    setNombreError(false);
    setIdentificadorError(false);
    
    for(let i = 0; i<comerciosRegistrados.length; i++){
      if(comerciosRegistrados[i]. nombre === nombre){
        setNombreError(true);
        setNombreRegistrado("El nombre para el comercio ya se encuentra registrado" );
        return;
      }
      else if(comerciosRegistrados[i].identificador === identificador ){
        setIdentificadorError(true);
        setNombreRegistrado("El identificador para el comercio ya se encuentra registrado");
        return;
      }
    }
    
    setNombreRegistrado('');
    if(nombreError){
      console.log("Nombre  incorrecto");
      setNombreRegistrado("El nombre para el comercio ya se encuentra registrado");
      return;
    }
    else if(identificadorError){
      console.log("Id incorrecto");
      setNombreRegistrado("El identificador para el comercio ya se encuentra registrado");
      return;
    }

    if(nombre === ''){
      setNombreError(true);
      return;
    }
    else if(identificador === ''){
      setIdError(true);
      return;
    }

    const comercioRef = ref(db, `usuarios/${user.uid}/comercios/${nombre.toLowerCase()}`);
    const snapshot = await get(comercioRef);

    if (snapshot.exists() && nombreComercio === "nuevo") {
      console.log("Comercio existente");
      return;
    }

    const retorno = await guardarComercio(user.uid, nombreComercio, nombre, identificador, ubicacion, telefono, logo, banner, conocenos, caracteristicas, diasLaborales);
     if(retorno === true){
        setShowPopup(true);
     }
     else{
      console.log("ERROR");
     }
  }
  catch(e){
    console.error('Comercio no valido para subir a la base de datos', e);
  }
  
}

  return (

    <div>
       <div className='atras'>
            <button onClick={handleClick}>Atras</button>
        </div>

        <div className={showPopup ? '' : 'oculto'}>
                <div className='popup-producto'/>
                <div className='popup-producto-div '>
                    <h3>Desea agregar otro comercio?</h3>
                    <div className='popup-button-container'>
                        <button onClick={() => modificarProducto()}>Si</button>
                        <button onClick={() => handleClick()}>No</button>
                    </div>
                </div>
            </div>

        <div className='container'>
      <div className='containerOne'>
        <h2>Nombre</h2>
        <input maxlength="30" value={nombre} type="text" placeholder="Nombre" className={nombreError ? 'input-error' : ''} onChange={handleChage(setNombre)}/>
        
        <h2>Identificador</h2>
        <input value={identificador} type="text" placeholder="Identificador" className={identificadorError ? 'input-error no-padding' : 'no-padding'} onChange={handleChage(setIdentificador)}/> 
        <p maxlength="15" className='id-text'>TuCarta.com/{identificador.toLowerCase()}</p>
       
        <h2 >Telefono</h2>
        <input  maxlength="20" value={telefono} type="text" placeholder="Telefono" onChange={handleChage(setTelefono)}/>

        <h2>Conocenos...</h2>
        <input maxlength="150" value={conocenos} type="text" placeholder="Escriba aqui..." className='inputTwo' onChange={handleChage(setConocenos)}/>
        

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
        <div className={!showPopup ? '' : 'oculto'}>
          <Mapa onMapSelect={mapChange}/>
        </div>

        <div className='flex-row'>
          <div>
 
            <div>
              <input type="checkbox" id="martes" name="martes" className='miCheckBox' checked={diasLaborales.includes('martes')}  onChange={()=> agregarDiaLaboral('martes')}/>
              <label for="martes" >Martes</label> 
            </div>  
            <div>
              <input type="checkbox" id="miercoles" name="miercoles" className='miCheckBox' checked={diasLaborales.includes('miercoles')} onChange={()=> agregarDiaLaboral("miercoles")}/>
              <label for="miercoles" >Miercoles</label> 
          </div>  
          
        </div>
        <div>
          <div>
              <input type="checkbox" id="jueves" name="jueves" className='miCheckBox' checked={diasLaborales.includes('jueves')} onChange={()=> agregarDiaLaboral("jueves")}/>
              <label for="jueves" >Jueves</label> 
           </div>  

          <div>
              <input type="checkbox" id="viernes" name="viernes" className='miCheckBox' checked={diasLaborales.includes('viernes')} onChange={()=> agregarDiaLaboral("viernes")}/>
                <label for="viernes" >Viernes</label> 
          </div> 
        </div>
        <div>
            
          <div>
            <input type="checkbox" id="sabado" name="sabado" className='miCheckBox' checked={diasLaborales.includes('sabado')} onChange={()=> agregarDiaLaboral("sabado")}/>
            <label for="sabado" >Sabado</label> 
          </div> 
          <div>
              <input type="checkbox" id="domingo" name="domingo" className='miCheckBox' checked={diasLaborales.includes('domingo')} onChange={()=> agregarDiaLaboral("domingo")}/>
              <label for="domingo" >Domingo</label> 
          </div> 
        </div>
          
        </div>

   
        
        
        <button onClick={validarInformacion}>Guardar</button>
        <p className='error-inf'>{nombreRegistrado}</p>

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