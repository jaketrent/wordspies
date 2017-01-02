import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import game from './server/game'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App game={game.create()}/>, div)
})
