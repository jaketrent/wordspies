import axios from 'axios'
import React from 'react'

import Board from './Board'
import Turn from './Turn'
import css from './AgentGame.css'

const { shape, string} = React.PropTypes

class AgentGame extends React.Component {
  constructor(props) {
    super(props)
    this.state = { game: null }
    this.handleClickTile = this.handleClickTile.bind(this)
  }
  componentWillMount() {
    axios.get('http://localhost:3001/games/' + this.props.params.gameId)
      .then(res => this.setState({ game: res.data }))
  }
  handleClickTile(i) {
    const tile = this.state.game.tiles[i]
    if (!tile.faceup) {
      axios.post('http://localhost:3001/games/' + this.state.game.id + '/cards/' + i)
        .then(res => this.setState({ game: res.data }))
    }
  }
  render() {
    return this.state.game
      ? (
        <div className={css.root}>
          <Board onClickTile={this.handleClickTile}
                tiles={this.state.game.tiles} />
          <Turn turn={this.state.game.turn} />
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
