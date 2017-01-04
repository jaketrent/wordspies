import React from 'react'

import Board from './Board'
import GameOver from './GameOver'
import Hint from './Hint'
import Phase from './Phase'
import TeamName from './TeamName'
import Turn from './Turn'
import Victory from './Victory'
import css from './CodemasterKey.css'
import game from './game'

const { shape, string} = React.PropTypes

function toUpper(str) {
  return str.charAt(0).toUpperCase() + str.substr(1)
}

function getTeamId(teamColor) {
  return teamColor === 'red' ? 'r' : 'b'
}

class CodemasterKey extends React.Component {
  constructor(props) {
    super(props)
    this.state = { game: null }
    this.handleSubmitHint = this.handleSubmitHint.bind(this)
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
  handleSubmitHint(hint) {
    game.codemasterHint(this.props.params.gameId, hint)
  }
  render() {
    return this.state.game
      ? (
        <div className={css.root}>
          <h2>{toUpper(this.props.params.teamColor)}'s Codemaster</h2>
          <Board keyed={true} tiles={this.state.game.tiles} />
          <Turn turn={this.state.game.turn}>
            <Phase in={['playing']} phase={this.state.game.phase}>
              <TeamName turn={this.state.game.turn} />
            </Phase>
            <Phase in={['won']} phase={this.state.game.phase}>
              <Victory teamId={this.state.game.turn} />
            </Phase>
            <Phase in={['gameover']} phase={this.state.game.phase}>
              <GameOver teamId={this.state.game.turn} />
            </Phase>
          </Turn>
          <Hint game={this.state.game}
                onSubmit={this.handleSubmitHint}
                teamId={getTeamId(this.props.params.teamColor)} />
        </div>
      )
      : <div>Loading key...</div>
  }
}
CodemasterKey.propTypes = {
  params: shape({
    teamColor: string.isRequired,
    gameId: string.isRequired
  })
}

export default CodemasterKey
