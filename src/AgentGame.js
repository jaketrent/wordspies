import React from 'react'

import Board from './Board'
import PlayCount from './PlayCount'
import ReadonlyHint from './ReadonlyHint'
import Turn from './Turn'
import css from './AgentGame.css'
import game from './game'

const { shape, string} = React.PropTypes

class AgentGame extends React.Component {
  constructor(props) {
    super(props)
    this.state = { game: null }
    this.handleClickTile = this.handleClickTile.bind(this)
    this.handleGameUpdated = this.handleGameUpdated.bind(this)
  }
  componentWillMount() {
    game.lookup(this.props.params.gameId)
      .then(g => this.setState({ game: g }))

    game.listenGameUpdated(this.handleGameUpdated)
  }
  componentWillUnmount() {
    game.unlistenGameUpdated(this.handleGameUpdated)
  }
  handleGameUpdated(g) {
    this.setState({ game: g })
  }
  handleClickTile(i) {
    const tile = this.state.game.tiles[i]
    if (!tile.faceup && this.state.game.hint) {
      game.agentPlay(this.state.game.id, i)
    }
  }
  render() {
    return this.state.game
      ? (
        <div className={css.root}>
          <Board onClickTile={this.handleClickTile}
                 tiles={this.state.game.tiles} />
          <Turn turn={this.state.game.turn} />
          <ReadonlyHint hint={this.state.game.hint} />
          <PlayCount count={this.state.game.playCount} />
        </div>
      )
      : <div>Loading game...</div>
  }
}
AgentGame.propTypes = {
  params: shape({
    gameId: string.isRequired
  })
}

export default AgentGame
