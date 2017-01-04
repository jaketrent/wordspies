import React from 'react'

const { string } = React.PropTypes

class TeamName extends React.Component {
  render() {
    const text = this.props.turn === 'r' ? 'Red\'s turn' : 'Blue\'s turn'
    return <div>{text}</div>
  }
}
TeamName.propTypes = {
  turn: string.isRequired
}

export default TeamName
