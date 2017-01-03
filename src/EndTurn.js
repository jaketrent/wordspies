import React from 'react'

import css from './EndTurn.css'

const { number, func } = React.PropTypes

class EndTurn extends React.Component {
  render() {
    return this.props.count >= 1
    ? (
        <button className={css.root} onClick={this.props.onClick}>End Turn</button>
      )
    : null
  }
}
EndTurn.propTypes = {
  count: number.isRequired,
  onClick: func.isRequired
}

export default EndTurn
