import React from 'react'

import css from './Victory.css'

const { string } = React.PropTypes

class Victory extends React.Component {
  render() {
    const className = this.props.teamId === 'r' ? css.rootRed : css.rootBlue
    return (
      <div className={className}>{this.props.teamId === 'r' ? 'Red' : 'Blue'} team wins!</div>
    )
  }
}
Victory.propTypes = {
  teamId: string.isRequired
}

export default Victory
