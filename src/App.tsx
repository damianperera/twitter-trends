import React, { Component } from 'react';
import logo from './twitter-logo.svg'
import './App.css';

class App extends Component {

  constructor(props: any) {
    super(props);
    this.state = {
      ip: '127.0.0.1'
    };
  }

  isDevelopmentBuild: boolean = process.env.REACT_APP_MODE === 'Development'

  if (isDevelopmentBuild: boolean) {
    console.warn('This application is still under development')
  }

  fetchIP() {
    fetch(`https://api.ipify.org?format=json`)
      .then(res => res.json())
      .then(json => this.setState({ ...json }));
  }

  componentDidMount() {
    this.fetchIP()
  }

  render() {
    return (
      <div className="App">
        { this.isDevelopmentBuild && (
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
    )
  }
}

export default App;
