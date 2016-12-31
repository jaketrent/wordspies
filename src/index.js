import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import game from './game'
import './index.css'

ReactDOM.render(
  <App game={game.create()} />,
  document.getElementById('root')
)
