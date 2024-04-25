import React from 'react';
import { useNavigate } from 'react-router';
import { useUserContext } from '../../context/UserContext';

const Logout = () => { 
    const navigate = useNavigate();
    const { user, setUser } = useUserContext();

    localStorage.removeItem('user');
    setUser(null);

    navigate("/login");
}

export default Logout;