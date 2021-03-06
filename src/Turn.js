import React from 'react'
import css from './Turn.css'

const { string } = React.PropTypes

class Turn extends React.Component {
  render() {
    const className = this.props.turn === 'r' ? css.rootRed : css.rootBlue
    return (
      <div className={className}>
        {this.props.children}
      </div>
    )
  }
}
Turn.propTypes = {
  turn: string.isRequired
}

export default Turn
