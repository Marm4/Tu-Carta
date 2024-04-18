import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="left-section">
        <span className="title">Tu Carta</span>
      </div>
      <div className="right-section">
        <Link to="/" className="link">Home</Link>
        <Link to="/about" className="link">About</Link>
        <Link to="/contact" className="link">Contact</Link>
        <Link to="/login" className="link">Login</Link>
      </div>
    </header>
  );
}

export default Header;