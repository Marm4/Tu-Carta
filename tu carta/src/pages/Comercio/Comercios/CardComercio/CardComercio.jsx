import React, { useState, useEffect } from 'react';
import './CardComercio.css'

const CardComercio = ({ comercio }) => {
    const nombre = comercio.nombre;
    const logo = comercio.logo;
    const banner = comercio.banner;

  return (
    <div className="general-container card">
      <h3>{nombre}</h3>
    </div>
  );
};

export default CardComercio;