import React from 'react';
import logo from './twitter-logo.svg'
import './App.css';

function App() {

  const IS_DEVELOPMENT_BUILD = process.env.REACT_APP_MODE === 'Development'

  if (IS_DEVELOPMENT_BUILD) {
    console.warn('This application is still under development')
  }

  return (
    <div className="App">
      { IS_DEVELOPMENT_BUILD && (
        <header className="App-header">
          <p>
            Coming Soon<br/><br/><small>This app is under development</small>
          </p>
        </header>
      )}
      <header className="App-header">
        <div style={{ flexDirection: 'row', justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
          <img className="twitter-logo" alt="Twitter" src={logo}></img>Trends
        </div>
      </header>
    </div>
  );
}

export default App;
