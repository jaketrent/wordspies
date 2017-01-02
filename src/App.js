import axios from 'axios'
import React, { Component } from 'react'
import css from './App.css'
import Board from './Board'
import Turn from './Turn'
import Number from './Number'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { game: null }
    this.handleClickTile = this.handleClickTile.bind(this)
    this.handleClickNum = this.handleClickNum.bind(this)
  }
  componentWillMount() {
    axios.post('http://localhost:3001/games')
      .then(res => this.setState({ game: res.data }))
  }
  handleClickTile(i) {
    const tile = this.state.game.tiles[i]
    if (!tile.faceup) {
      axios.post('http://localhost:3001/games/' + this.state.game.id + '/cards/' + i)
        .then(res => this.setState({ game: res.data }))
    }
  }
  handleClickNum(num) {
    // TODO: re-impl after codemaster view impl
    // this.setState({ game: game.setGuessCount(this.state.game, num) })
  }
  render() {
    return this.state.game
      ? (
        <div className={css.root}>
          <Board onClickTile={this.handleClickTile}
                tiles={this.state.game.tiles} />
          <Turn turn={this.state.game.turn} />
          <Number onClickNum={this.handleClickNum}
                  guess={this.state.game.guess} />
        </div>
      )
      : <div>Creating your game...</div>
  }
}

export default App
