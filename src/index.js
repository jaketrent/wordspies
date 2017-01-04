import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'

import App from './App'
import AgentGame from './AgentGame'
import CodemasterKey from './CodemasterKey'
import Setup from './Setup'
import './index.css'

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App} />
    <Route path="/games/:gameId" component={Setup} />
    <Route path="/games/:gameId/agents" component={AgentGame} />
    <Route path="/games/:gameId/codemasters/:teamColor" component={CodemasterKey} />
  </Router>,
  document.getElementById('root')
)
