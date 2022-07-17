import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';
import ExpProvider from './context/ExpProvider';
import Transactions from './pages/Transactions';
import Login from './pages/Login';

function App() {
  return (
    <ExpProvider>
      <div className="App">
        <Routes>
          <Route exact path="/" element={ <Login /> } />
          <Route exact path="/home" element={ <Home /> } />
          <Route exact path="/transactions" element={ <Transactions /> } />
          <Route path="*" element={ <Login /> } />
        </Routes>
      </div>
    </ExpProvider>
  );
}

export default App;
