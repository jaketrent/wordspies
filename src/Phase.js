import React from 'react'

const { arrayOf, string } = React.PropTypes

class Phase extends React.Component {
  render() {
    return this.props.in.includes(this.props.phase)
      ? <div>{this.props.children}</div>
      : <noscript></noscript>
  }
}
Phase.propTypes = {
  phase: string,
  in: arrayOf(string).isRequired
}

export default Phase
