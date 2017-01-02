import axios from 'axios'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'

async function create() {
  const res = await axios.post('http://localhost:3001/games')
  return res.data
}

async function run() {
  const game = await create()
  ReactDOM.render(
    <App game={game} />,
    document.getElementById('root')
  )
}

run()

