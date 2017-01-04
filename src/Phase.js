import React from 'react'

const { arrayOf, string } = React.PropTypes

class Phase extends React.Component {
  render() {
    return this.props.in.includes(this.props.phase)
      ? this.props.children
      : null
  }
}
Phase.propTypes = {
  phase: string,
  in: arrayOf(string).isRequired
}

export default Phase
