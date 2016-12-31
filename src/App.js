import React, { Component } from 'react'
import css from './App.css'
import Board from './Board'

class App extends Component {
  render() {
    return (
      <div className={css.root}>
        <Board tiles={this.props.game.tiles} />
      </div>
    )
  }
}

export default App
