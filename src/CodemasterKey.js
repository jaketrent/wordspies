import React from 'react'

import Board from './Board'
import Hint from './Hint'
import Turn from './Turn'
import css from './CodemasterKey.css'
import game from './game'

const { shape, string} = React.PropTypes

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
          <Board keyed={true} tiles={this.state.game.tiles} />
          <Turn turn={this.state.game.turn} />
          <Hint onSubmit={this.handleSubmitHint} />
        </div>
      )
      : <div>Loading key...</div>
  }
}
CodemasterKey.propTypes = {
  params: shape({
    gameId: string.isRequired
  })
}

export default CodemasterKey
