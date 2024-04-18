import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppProvider  from './AppProvider';
import AppRouter from './routes/AppRouter';
import './App.css'

function App() {

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
