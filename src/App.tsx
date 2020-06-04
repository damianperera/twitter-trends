import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const REACT_APP_MODE = process.env.REACT_APP_MODE

  if (REACT_APP_MODE === 'Development') {
    console.log('This is a development')
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
