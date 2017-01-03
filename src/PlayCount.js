import React from 'react'

import css from './PlayCount.css'

const { number } = React.PropTypes

class PlayCount extends React.Component {
  render() {
    return (
      <div className={css.root}>{this.props.count} guesses made this turn</div>
    )
  }
}
PlayCount.propTypes = {
  count: number.isRequired
}

export default PlayCount
