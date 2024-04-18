import React from 'react';
import './EditarComercio.css'
import Mapa from '../../Utilities/Mapa/Mapa'
import FileSelect from '../../Utilities/FileSelect/FileSelect'


const EditarComercio = () => {
  return (
    <div className='container'>
      <div className='containerOne'>
        <h2>Nombre</h2>
        <input type="text" placeholder="Nombre" />
        <h2>Identificador</h2>
        <input type="text" placeholder="/Nombre" />
        <h2>Mapa</h2>
        <Mapa/>
        
        <h2 className='telefono'>Telefono</h2>
        <input type="text" placeholder="Telefono" />

    </div>
    <div className='containerTwo'>
        <h2>Banner</h2>
        <FileSelect/>
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
        <FileSelect/>
        
        <button>Guardar</button>
      </div>
    </div>
  );
}

export default EditarComercio;