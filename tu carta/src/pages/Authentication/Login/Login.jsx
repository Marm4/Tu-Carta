import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useUserContext } from '../../../context/UserContext'
import { useNavigate } from "react-router-dom";
import { firebaseApp } from '../../../config/firebaseConfig';
import './Login.css'; 


const Login = () => {
  const [email, setEmail] = useState('');
  const [password,  setPassword] = useState('');
  const { setUser } = useUserContext();
  const { user } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    
    if (user) {
      navigate('/comercios');
    }
  });
  
  const handleChange = (setState) => (event) => {
    const value = event.target.value;
    setState(value);
  }

  const handleLogin = async () => {
    try {
      const auth = getAuth(firebaseApp); 
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      localStorage.setItem('user', JSON.stringify(user)); 
      setUser(user);
      console.log('Inicio de sesión exitoso');
      navigate("/comercios");
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };


  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Bienvenido</h2>
        
        <div className='input-box'>
          <input type="email" placeholder="Email" onChange={handleChange(setEmail)} />
          <input type="password" placeholder="Contraseña" onChange={handleChange(setPassword)} />
        </div>
        
        <button className="login-button" onClick={handleLogin}>Iniciar sesión</button>
    
        <div className="separator"/>
        <Link to="/singin" className="no-account">Todavía no tengo una cuenta</Link>
        

      </div>
    </div>
  );
}

export default Login;