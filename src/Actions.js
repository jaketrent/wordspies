import React from 'react'
import css from './Actions.css'

const { string } = React.PropTypes

class Actions extends React.Component {
  render() {
    return <div className={css.root}>{this.props.children}</div>
  }
}
Actions.propTypes = {
  turn: string.isRequired
}

export default Actions
