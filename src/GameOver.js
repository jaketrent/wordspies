import React from 'react'

import css from './GameOver.css'

const { string } = React.PropTypes

class GameOver extends React.Component {
  render() {
    const className = this.props.teamId === 'r' ? css.rootRed : css.rootBlue
    return (
      <div className={className}>{this.props.teamId === 'r' ? 'Red' : 'Blue'} has lost. :(</div>
    )
  }
}
GameOver.propTypes = {
  teamId: string.isRequired
}

export default GameOver
