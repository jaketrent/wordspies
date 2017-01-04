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
      .then(g => window.location = '/games/' + g.id)
  }
  render() {
    return (
      <div className={css.root}>
        <Title>Word Spies</Title>
        <button className={css.btn} onClick={this.handleClickCreate}>Create game</button>
      </div>
    )
  }
}

export default App
