import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'

import App from './App'
import AgentGame from './AgentGame'
import CodemasterKey from './CodemasterKey'

import './index.css'

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App} />
    <Route path="/games/:gameId" component={AgentGame} />
    <Route path="/games/:gameId/codemasters" component={CodemasterKey} />
  </Router>,
  document.getElementById('root')
)
