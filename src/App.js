import axios from 'axios'
import { Link } from 'react-router'
import React, { Component } from 'react'

import css from './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { game: null }
    this.handleClickCreate = this.handleClickCreate.bind(this)
  }
  handleClickCreate() {
    axios.post('http://localhost:3001/games')
      .then(res => this.setState({ game: res.data }))
  }
  render() {
    return this.state.game
      ? (
        <div className={css.root}>
          <Link className={css.link} to={'/games/' + this.state.game.id}>for Agents</Link>
          <Link className={css.link} to={'/games/' + this.state.game.id + '/codemasters'}>for Codemasters</Link>
        </div>
      )
    : (
      <div className={css.root}>
        <h2>Word Spies</h2>
        <button onClick={this.handleClickCreate}>Create game</button>
      </div>
    )
  }
}

export default App
