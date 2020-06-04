import React, { Component } from 'react'
import logo from './twitter-logo.svg'
import './App.css'

class App extends Component {

  constructor(props: any) {
    super(props);
    this.state = {
      ip: '127.0.0.1',
      trends: []
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
    const res = await fetch(`https://twittertrends.perera.io/twitter/search/tweets.json?q=${trend.query}&lang=en`, {
      headers: {
        Authorization: `Bearer ${this.TWITTER_BEARER_TOKEN}`
      }
    })
    const data = await res.json()
    trend.tweets = data.statuses
    return Promise.resolve(trend)
  }

  async fetchTrends() {
    const res = await fetch('https://twittertrends.perera.io/twitter/trends/place.json?id=1', {
      headers: {
        Authorization: `Bearer ${this.TWITTER_BEARER_TOKEN}`
      }
    })
    const trends = (await res.json())[0].trends.slice(0,5)
    
    for (let i = 0; i < trends.length; i++) {
      const trend = await this.fetchSearch(trends[i])
      console.log('TREND: ' + trend)
      trends[i] = trend
    }

    this.setState({ trends })
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