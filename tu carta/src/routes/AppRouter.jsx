import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Comercios from '../pages/Comercio/Comercios';
import Header from '../components/Header/Header';
import Login from '../pages/Authentication/Login/Login';
import EditarComercio from '../pages/Comercio/EditarComercio/EditarComercio';
import Signin from '../pages/Authentication/Signin/Signin';
import PrivateRoute from '../components/PrivateRoute'
import Logout from "../pages/Authentication/Logout"


const AppRouter = () => {
  return (
      <div>
        <Header />  
          <Routes>
            <Route element={<PrivateRoute/>}>
              <Route path="/comercios" element={<Comercios/>}/>
              <Route path="/" element={<Comercios/>}/>
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/editar-comercio" element={<EditarComercio/>} />
            <Route path="/singin" element={<Signin/>} />
            <Route path="/logout" element= {<Logout/>}/>
          </Routes>
      </div>
    
  );
};

export default AppRouter;