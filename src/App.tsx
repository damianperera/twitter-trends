import React, { Component } from 'react'
import logo from './twitter-logo.svg'
import './App.css'

class App extends Component {

  constructor(props: any) {
    super(props);
    this.state = {
      ip: '127.0.0.1',
      trends: [],
      places: []
    };
  }

  isDevelopmentBuild: boolean = process.env.REACT_APP_MODE === 'Development'
  TWITTER_BEARER_TOKEN = process.env.REACT_APP_TWITTER_BEARER_TOKEN!

  if (isDevelopmentBuild: boolean) {
    console.warn('This application is still under development')
  }

  fetchIP() {
    fetch(`https://api.ipify.org?format=json`)
      .then(res => res.json())
      .then(({ ip }) => this.setState({ ip }));
  }

  async fetchSearch(trend: any) {
    fetch(`https://twittertrends.perera.io/twitter/search/tweets.json?q=${trend.query}`, {
      headers: {
        Authorization: `Bearer ${this.TWITTER_BEARER_TOKEN}`
      }
    })
    .then(res => res.json())
    .then(res => {
      trend.tweets = res
      Promise.resolve(trend)
    })
  }

  fetchTrendLocations() {
    fetch('https://twittertrends.perera.io/twitter/trends/available.json', {
      headers: {
        Authorization: `Bearer ${this.TWITTER_BEARER_TOKEN}`
      }
    })
    .then(res => res.json())
    .then(res => this.setState({ places: res }))
  }

  fetchTrends() {
    fetch('https://twittertrends.perera.io/twitter/trends/place.json?id=1', {
      headers: {
        Authorization: `Bearer ${this.TWITTER_BEARER_TOKEN}`
      }
    })
    .then(res => res.json())
    .then(res => {
      const trends = res[0].trends
      this.setState({ trends })
    })
  }

  componentDidMount() {
    if (!this.isDevelopmentBuild) {
      this.fetchIP()
      this.fetchTrends()
    }
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