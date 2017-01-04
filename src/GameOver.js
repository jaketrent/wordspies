import React from 'react'

const { string } = React.PropTypes

class GameOver extends React.Component {
  render() {
    return (
      <div>{this.props.teamId === 'r' ? 'Red' : 'Blue'} has lost. :(</div>
    )
  }
}
GameOver.propTypes = {
  teamId: string.isRequired
}

export default GameOver
