import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppProvider  from './routes/AppProvider';
import AppRouter from './routes/AppRouter';
import { useUserContext } from './context/UserContext';

function App() {
  const { setUser } = useUserContext();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);


  return (
    <>
      <div className="App">
      <AppProvider>
        <Router>
          <AppRouter />
        </Router>
      </AppProvider>
    </div>
    </>
  )
}

export default App
