import React from 'react'

import Number from './Number'
import css from './Hint.css'

const { func, object, string } = React.PropTypes

class Hint extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(evt) {
    evt.preventDefault()
    this.props.onSubmit({
      word: evt.target.word.value,
      count: parseInt(evt.target.count.value, 10)
    })
  }
  render() {
    return (
      <form className={css.root} onSubmit={this.handleSubmit}>
        <label htmlFor="word">
          <span>Word:</span>
          <input type="text" name="word" />
        </label>
        <Number>
          <input type="number" name="count" value="1" />
        </Number>
        <button disabled={this.props.teamId !== this.props.game.turn}>Give hint</button>
      </form>
    )
  }
}
Hint.propTypes = {
  game: object,
  onSubmit: func.isRequired,
  teamId: string.isRequired
}

export default Hint
