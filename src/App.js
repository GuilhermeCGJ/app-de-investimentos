import React from 'react';
import './App.css';
import ExpProvider from './context/ExpProvider';

function App() {
  return (
    <ExpProvider>
      <div className="App">
        Teste
      </div>
    </ExpProvider>
  );
}

export default App;
