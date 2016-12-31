import React, { Component } from 'react'
import css from './App.css'
import Board from './Board'
import Turn from './Turn'
import game from './game'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { game: this.props.game }
    this.handleClickTile = this.handleClickTile.bind(this)
  }
  handleClickTile(i) {
    const tile = this.state.game.tiles[i]
    if (!tile.faceup) {
      this.setState({ game: game.advanceGame(this.state.game, i) })
    }
  }
  render() {
    return (
      <div className={css.root}>
        <Board onClickTile={this.handleClickTile} tiles={this.state.game.tiles} />
        <Turn turn={this.state.game.turn} />
      </div>
    )
  }
}

export default App
