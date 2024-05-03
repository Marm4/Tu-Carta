import React, { useState } from 'react';

function FileSelect({ onSelectedImage, size = true}) {
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  const smallSize = size;

  const manejarSeleccionArchivo = (event) => {
    const archivo = event.target.files[0];
    if (archivo) {
      setImagenSeleccionada(URL.createObjectURL(archivo));
      onSelectedImage(archivo);
    }
  };

  return (
    <div style={smallSize ? { display: 'flex', flexDirection: 'column', alignItems: 'center', height: '25vh', width:'23.5vw', backgroundColor: '#F1F1F1', border: '1px solid #ccc', marginBottom:'22px' } : { display: 'flex', flexDirection: 'column', alignItems: 'center', height: '25vh', width:'15vw', backgroundColor: '#F1F1F1', border: '1px solid #ccc', marginBottom:'22px' }}>
      <input type="file" onChange={manejarSeleccionArchivo} accept="image/*" style={ smallSize ? {border: 'none', width: '15vw', paddingTop: '15px'} : {border: 'none',  width:'8vw', paddingTop: '15px'} }/>
      {imagenSeleccionada && (
        <img
          src={imagenSeleccionada}
          alt="Imagen seleccionada"
          style={smallSize ? { width: 'auto', height: 'auto', maxWidth: '23.5vw', maxHeight: '15vh', margin: '0 0 2vh 0' } : { width: 'auto', height: 'auto', maxWidth: '12vw', maxHeight: '14vh', margin: '0 0 2vh 0' }}
        />
      )}
    </div>
  );
}

export default FileSelect;