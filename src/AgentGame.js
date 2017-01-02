import React from 'react'

import Board from './Board'
import Turn from './Turn'
import Number from './Number'
import css from './AgentGame.css'

const { object } = React.PropTypes

class AgentGame extends React.Component {
  handleClickTile(i) {
    const tile = this.state.game.tiles[i]
    if (!tile.faceup) {
      axios.post('http://localhost:3001/games/' + this.state.game.id + '/cards/' + i)
        .then(res => this.setState({ game: res.data }))
    }
  }
  render() {
    <div className={css.root}>
      <Board onClickTile={this.handleClickTile}
             tiles={this.state.game.tiles} />
      <Turn turn={this.state.game.turn} />
      <Number onClickNum={this.handleClickNum}
              guess={this.state.game.guess} />
    </div>
  }
}
AgentGame.propTypes = {
  game: object.isRequired
}

export default AgentGame
