import React from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext'
import './Header.css';

const Header = () => {
  const { user } = useUserContext();

  return (
    <header className="header">
      <div className="left-section">
        <span className="title">Tu Carta</span>
      </div>

      <div className="right-section">
        {user &&(
          <Link to="/comercios" className="link">Comercios</Link> 
          
        )}
         
         {!user &&(
          <Link to="/login" className="link">Login</Link>
         )}

          {user &&(
            <Link to="/logout" className="link">Logout</Link> 
          )}
        
      </div>
    </header>
  );
}

export default Header;