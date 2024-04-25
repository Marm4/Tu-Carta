import React, { useState } from 'react';

function FileSelect({ onSelectedImage }) {
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);

  const manejarSeleccionArchivo = (event) => {
    const archivo = event.target.files[0];
    if (archivo) {
      setImagenSeleccionada(URL.createObjectURL(archivo));
      onSelectedImage(archivo);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '25vh', width:'23.5vw', backgroundColor: '#F1F1F1', border: '1px solid #ccc', marginBottom:'22px' }}>
      <input type="file" onChange={manejarSeleccionArchivo} accept="image/*" style={{border: 'none', width: '21vw', paddingTop: '15px'}}/>
      {imagenSeleccionada && (
        <img
          src={imagenSeleccionada}
          alt="Imagen seleccionada"
          style={{ width: 'auto', height: 'auto', maxWidth: '23.5vw', maxHeight: '15vh', margin: '0 0 2vh 0' }}
        />
      )}
    </div>
  );
}

export default FileSelect;