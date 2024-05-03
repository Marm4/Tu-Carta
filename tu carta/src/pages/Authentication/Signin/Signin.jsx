import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './Signin.css';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useUserContext } from '../../../context/UserContext'



const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setRepeatShowPassword] = useState(false);
    const navigate = useNavigate();
    const { setUser } = useUserContext();
    const [error, setError] = useState(" ");
    const patron = /@.*\.com$/;
    const { user } = useUserContext();

    useEffect(() => {
        if (user) {
          navigate('/comercios');
        }
      });


    const togglePasswordVisibility = (setState) => {
        setState((prevState) => !prevState);
    };

    const handleChange = (setState) => (event) => {
        const value = event.target.value;
        setState(value);
    }

    const handleSubmit = async () => {
        if(password == "" && email == ""){
            setError("Complete todos los campos");
            return;    
        }

        if (password !== repeatPassword) {
            setPasswordsMatch(false); 
            return;
        }

        if(!patron.test(email)){
            setError("El email ingresado no es valido");
            return;
        }
    
        try {
            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log('Usuario registrado exitosamente:', user);
            setUser(user);
            navigate("/comercios");

          } catch (error) {
            console.error('Error al registrar el usuario:', error);
            setShowError(true);
          }
    };
      

    return (
        <div className="signin-containter">
            <div className="signin-box">
                <h2>Tu Carta</h2>
    
                <input  maxlength="25" type="email" placeholder="Email" onChange={handleChange(setEmail)}/>
                
                <div className='password-container'>
                    <input maxlength="25" type={showPassword ? 'text' : 'password'} placeholder="Contraseña" className={!passwordsMatch ? 'input-error' : ''} onChange={handleChange(setPassword)}/>
                    <div className="eye" onClick={() => togglePasswordVisibility(setShowPassword)} />
                </div>
                
                <div className='password-container'>
                    <input maxlength="25" type={showRepeatPassword ? 'text' : 'password'} placeholder="Repetir contraseña" className={!passwordsMatch ? 'input-error' : ''} onChange={handleChange(setRepeatPassword)}/>
                    <div className="eye" onClick={() => togglePasswordVisibility(setRepeatShowPassword)}/>
                </div>
                
                    
                
                

                <button className="signin-button" onClick={handleSubmit}>Registrarse</button>
                <p>{error}</p>

                
            </div>
        </div>
    )
}

export default Signin;