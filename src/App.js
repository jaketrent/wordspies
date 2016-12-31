import React, { Component } from 'react'
import css from './App.css'
import Board from './Board'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { game: this.props.game }
    this.handleClickTile = this.handleClickTile.bind(this)
  }
  handleClickTile(i) {
    const tile = this.state.game.tiles[i]
    if (!tile.faceup) {
      const tiles = this.state.game.tiles.slice(0)
      tiles.splice(i, 1, { ...tile, faceup: true })
      const game = {
        ...this.state.game,
        tiles
      }
      this.setState({ game })
    }
  }
  render() {
    return (
      <div className={css.root}>
        <Board onClickTile={this.handleClickTile} tiles={this.state.game.tiles} />
      </div>
    )
  }
}

export default App
