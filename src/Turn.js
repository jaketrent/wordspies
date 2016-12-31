import React from 'react'
import css from './Turn.css'

const { string } = React.PropTypes

class Turn extends React.Component {
  render() {
    return (
      <div className={css.root}>{this.props.turn === 'r' ? 'Red\'s turn' : 'Blue\'s turn'}</div>
    )
  }
}
Turn.propTypes = {
  turn: string.isRequired
}

export default Turn
