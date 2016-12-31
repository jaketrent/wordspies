import React from 'react'
import css from './Number.css'

const { func, number, shape } = React.PropTypes

class Number extends React.Component {
  renderNums() {
    return [1, 2, 3, 4, 5].map(num => {
      const className = num === this.props.guess.count ? css.numActive : css.num
      return (
        <button className={className}
                key={num}
                onClick={this.props.onClickNum.bind(null, num)}>{num}</button>
      )
    })
  }
  render() {
    return (
      <div className={css.root}>
        {this.renderNums()}
      </div>
    )
  }
}
Number.propTypes = {
  guess: shape({
    count: number.isRequired
  }),
  onClickNum: func.isRequired
}

export default Number
