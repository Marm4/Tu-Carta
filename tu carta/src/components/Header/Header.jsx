import React from 'react';
import './Header.css';
import { useNavigate} from 'react-router';
import { Link } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';

const Header = () => {
  const navigate = useNavigate();
  const user = useUserContext();

  const handleClick = () =>{
    navigate('/');
  }

  return (
    <header className="header">
      <div className="left-section">
        <button onClick={handleClick} className="button-title">Tu Carta</button>
      </div>

      <div className="right-section">
      <div className='logout'>
      {user &&(
            <Link to="/logout" className="link">Logout</Link> 
          )}
      </div>
      </div>
    </header>
  );
}

export default Header;