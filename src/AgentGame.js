import DocumentTitle from 'react-document-title'
import React from 'react'

import Board from './Board'
import EndTurn from './EndTurn'
import GameOver from './GameOver'
import Menu from './Menu'
import Phase from './Phase'
import PlayCount from './PlayCount'
import ReadonlyHint from './ReadonlyHint'
import TeamName from './TeamName'
import Title from './Title'
import Turn from './Turn'
import Victory from './Victory'
import css from './AgentGame.css'
import game from './game'

const { shape, string} = React.PropTypes

class AgentGame extends React.Component {
  constructor(props) {
    super(props)
    this.state = { game: null }
    this.handleClickTile = this.handleClickTile.bind(this)
    this.handleGameUpdated = this.handleGameUpdated.bind(this)
    this.handleClickEndTurn = this.handleClickEndTurn.bind(this)
  }
  componentWillMount() {
    game.lookup(this.props.params.gameId)
      .then(g => this.setState({ game: g }))

    game.listenGameUpdated(this.props.params.gameId, this.handleGameUpdated)
  }
  componentWillUnmount() {
    game.unlistenGameUpdated(this.props.params.gameId, this.handleGameUpdated)
  }
  handleGameUpdated(g) {
    this.setState({ game: g })
  }
  handleClickTile(i) {
    const tile = this.state.game.tiles[i]
    if (!tile.faceup && this.state.game.hint && this.state.game.phase === 'playing') {
      game.agentPlay(this.state.game.id, i)
    }
  }
  handleClickEndTurn() {
    if (this.state.game.phase === 'playing')
      game.endTurn(this.state.game.id)
  }
  render() {
    return this.state.game
      ? (
        <DocumentTitle title="Agents | WordSpies">
          <div className={css.root}>
            <Title />
            <Board onClickTile={this.handleClickTile}
                  tiles={this.state.game.tiles} />
            <Turn turn={this.state.game.turn}>
              <Phase in={['playing']} phase={this.state.game.phase}>
                <TeamName turn={this.state.game.turn} />
              </Phase>
              <Phase in={['playing']} phase={this.state.game.phase}>
                <ReadonlyHint hint={this.state.game.hint} />
              </Phase>
              <Phase in={['playing']} phase={this.state.game.phase}>
                <PlayCount count={this.state.game.playCount} />
              </Phase>
              <Phase in={['playing']} phase={this.state.game.phase}>
                <EndTurn count={this.state.game.playCount}
                        onClick={this.handleClickEndTurn} />
              </Phase>
              <Phase in={['won']} phase={this.state.game.phase}>
                <Victory teamId={this.state.game.turn} />
              </Phase>
              <Phase in={['gameover']} phase={this.state.game.phase}>
                <GameOver teamId={this.state.game.turn} />
              </Phase>
            </Turn>
            <Menu gameId={this.state.game.id}></Menu>
          </div>
        </DocumentTitle>
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
