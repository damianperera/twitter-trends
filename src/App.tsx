import React, { Component } from 'react'
import { trackPromise, usePromiseTracker } from 'react-promise-tracker'
import Loader from 'react-spinners/BarLoader';
import { CSSTransition } from 'react-transition-group';
import logo from './twitter-logo.svg'
import './App.css'

class App extends Component {

  constructor(props: any) {
    super(props);
    this.state = {
      trends: []
    };
  }

  isDevelopmentBuild: boolean = process.env.REACT_APP_MODE === 'Development'
  TWITTER_BEARER_TOKEN = process.env.REACT_APP_TWITTER_BEARER_TOKEN!
  
  if (isDevelopmentBuild: boolean) {
    console.warn('This application is still under development')
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
      trends[i] = trend
    }

    this.setState({ trends })

    return Promise.resolve()
  }

  componentDidMount() {
    if (!this.isDevelopmentBuild) {
      trackPromise(this.fetchTrends())
    }
  }

  render() {
    return (
      <div className='App'>
        { this.isDevelopmentBuild && (
          <header className='App-header'>
            <p>
              Coming Soon<br/><br/><small>This app is under development</small>
            </p>
          </header>
        )}
        <header className='App-header'>
          <StateSwitcher {...this.state}/>
        </header>
      </div>
    )
  }
}

const StateSwitcher = (props: any) => {
  const { trends } = props
  const { promiseInProgress } = usePromiseTracker()
  return (
    <div style = {{ position: 'relative', display:'flex' }}>
      <CSSTransition
        in={promiseInProgress}
        timeout={500}
        classNames="stateSwitcherTransition"
        unmountOnExit
      >
        <AppLoader />
      </CSSTransition>
      <CSSTransition
        in={!promiseInProgress}
        timeout={500}
        classNames="stateSwitcherTransition"
        unmountOnExit
      >
        <AppBody trends={trends.filter((trend: any) => trend.tweets.length > 0)}/>
      </CSSTransition>
    </div>
  )
}

const AppLoader = () => {
  return (
    <div className="App-state">
      <div style={{ flexDirection: 'row', justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
        <img className='twitter-logo' alt='Twitter' src={logo}></img>
        <div> Trends
          <div style={{ height: '0.1vh' }}>
            <Loader
              height={3}
              width={'99%'}
              color={'white'}
              loading
            />
          </div>
        </div>
      </div> 
    </div>
  )
}

const AppBody = (props: any) => {
  const { trends } = props
  console.log(trends)
  return (
    <div className="App-state">
      <div style={{ flexDirection: 'row', justifyContent: 'center', display: 'flex' }}>
          {trends.map((trend: any) => <Trend id={trend.query} {...trend}/>)}
      </div>
    </div>
  )
}

const Trend = (props: any) => {
  const { name, promoted_content, query, tweet_volume, tweets, url } = props
  return (
    <div className='App-trend'>
      <h4>{name}<small>{tweet_volume}</small></h4>
      {tweets.map((tweet: any) => <Tweet id={tweet.id} {...tweet}/>)}
    </div>
  )
}

const Tweet = (props: any) => {
  const { created_at, entities, id, retweet_count, source, text, user, retweeted, retweeted_status } = props
  return (
    <div className='App-tweet'>
      <p id={id} style={{ fontSize: '9px'}}>{text}</p>
    </div>
  )
}

export default App;