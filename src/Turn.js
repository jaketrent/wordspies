import React from 'react'
import css from './Turn.css'

const { string } = React.PropTypes

class Turn extends React.Component {
  render() {
    const className = this.props.turn === 'r' ? css.rootRed : css.rootBlue
    const text = this.props.turn === 'r' ? 'Red\'s turn' : 'Blue\'s turn'
    return (
      <div className={className}>{text}</div>
    )
  }
}
Turn.propTypes = {
  turn: string.isRequired
}

export default Turn
