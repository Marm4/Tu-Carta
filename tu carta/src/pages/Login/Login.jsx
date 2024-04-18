import React from 'react';
import './Login.css'; 



const Login = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Bienvenido</h2>
        
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Contraseña" />
        
        <button className="login-button">Iniciar sesión</button>
        
        <p className="ingresa">Ingresa con</p>
        
        <div className="login-options">
          <div class="google"/>
          <div class="facebook"/>
        </div>
       
        <div className="separator"></div>
        
        <p className="no-account">Todavía no tengo una cuenta</p>

      </div>
    </div>
  );
}

export default Login;