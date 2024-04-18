import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/Login">
          <Login />
        </Route>
        <Route path="/Home">
          <Home />
        </Route>
        <Route path="/">
          <Home /> {/* Página predeterminada */}
        </Route>
      </Switch>
    </Router>
  );
}

export default AppRouter;