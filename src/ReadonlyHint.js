import React from 'react'

import css from './ReadonlyHint.css'

const { number, shape, string } = React.PropTypes

class ReadonlyHint extends React.Component {
  render() {
    return this.props.hint
    ? (
        <div className={css.root}>
          <span className={css.label}>Hint:</span> {this.props.hint.word}/{this.props.hint.count}
        </div>
      )
    : <div className={css.rootWaiting}>Waiting for hint...</div>
  }
}
ReadonlyHint.propTypes = {
  hint: shape({
    word: string.isRequired,
    count: number.isRequired
  })
}

export default ReadonlyHint
