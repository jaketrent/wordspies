import { Link } from 'react-router'
import React, { Component } from 'react'

import Title from './Title'
import css from './App.css'
import game from './game'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { game: null }
    this.handleClickCreate = this.handleClickCreate.bind(this)
  }
  handleClickCreate() {
    game.create()
      .then(g => this.setState({ game: g }))
  }
  render() {
    return this.state.game
      ? (
        <div className={css.root}>
          <Title>Choose your role</Title>
          <div className={css.links}>
            <Link className={css.link} to={'/games/' + this.state.game.id}>Agent</Link>
            <Link className={css.link} to={'/games/' + this.state.game.id + '/codemasters/red'}>Red Codemaster</Link>
            <Link className={css.link} to={'/games/' + this.state.game.id + '/codemasters/blue'}>Blue Codemaster</Link>
          </div>
        </div>
      )
    : (
      <div className={css.root}>
        <Title>Word Spies</Title>
        <button className={css.btn} onClick={this.handleClickCreate}>Create game</button>
      </div>
    )
  }
}

export default App
