import React from 'react'

import css from './PlayCount.css'

const { number } = React.PropTypes

class PlayCount extends React.Component {
  render() {
    const noun = this.props.count === 1 ? 'guess' : 'guesses'
    return (
      <div className={css.root}>{this.props.count} {noun} made this turn</div>
    )
  }
}
PlayCount.propTypes = {
  count: number.isRequired
}

export default PlayCount
