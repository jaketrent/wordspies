import axios from 'axios'
import React from 'react'

import Board from './Board'
import Hint from './Hint'
import Turn from './Turn'
import css from './CodemasterKey.css'

const { shape, string} = React.PropTypes

class CodemasterKey extends React.Component {
  constructor(props) {
    super(props)
    this.state = { game: null }
    this.handleSubmitHint = this.handleSubmitHint.bind(this)
  }
  componentWillMount() {
    axios.get('http://localhost:3001/games/' + this.props.params.gameId)
      .then(res => this.setState({ game: res.data }))
  }
  handleSubmitHint(hint) {
    axios.post('http://localhost:3001/games/' + this.props.params.gameId + '/hints', hint)
      .then(res => this.setState({ game: res.data }))
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
