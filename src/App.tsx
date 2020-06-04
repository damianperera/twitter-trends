import React from 'react';
import './App.css';

function App() {

  const IS_DEVELOPMENT_BUILD = process.env.REACT_APP_MODE === 'Development'

  if (IS_DEVELOPMENT_BUILD) {
    console.warn('This application is still under development')
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          <b>Coming Soon</b><br/>This app is under development
        </p>
      </header>
    </div>
  );
}

export default App;
