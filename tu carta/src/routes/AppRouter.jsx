import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Header from '../components/Header/Header'
import Login from '../pages/Login/Login'
import EditarComercio from '../pages/Comercio/EditarComercio'

const AppRouter = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/editar-comercio" element={<EditarComercio/>} />
      </Routes>
    </div>
  );
};

export default AppRouter;