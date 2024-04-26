import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Comercios from '../pages/Comercio/Comercios/Comercios';
import Header from '../components/Header/Header';
import Login from '../pages/Authentication/Login/Login';
import EditarComercio from '../pages/Comercio/EditarComercio/EditarComercio';
import OpcionesComercio from '../pages/Comercio/OpcionesComercio/OpcionesComercio';
import Productos from '../pages/Productos/Productos'
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
              <Route path="/editar-comercio/:nombreComercio" element={<EditarComercio/>} />
              <Route path="/opciones-comercio/:nombreComercio" element={<OpcionesComercio/>}/>
              <Route path='/productos/:nombreComercio' element={<Productos/>}/>
              <Route path="/logout" element= {<Logout/>}/>
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/singin" element={<Signin/>} />
          </Routes>
      </div>
    
  );
};

export default AppRouter;