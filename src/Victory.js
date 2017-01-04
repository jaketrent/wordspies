import React from 'react'

const { string } = React.PropTypes

class Victory extends React.Component {
  render() {
    return <div>{this.props.teamId === 'r' ? 'Red' : 'Blue'} team wins! :)</div>
  }
}
Victory.propTypes = {
  teamId: string.isRequired
}

export default Victory
