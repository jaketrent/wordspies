import React from 'react'
import css from './Number.css'

const { node } = React.PropTypes

class Number extends React.Component {
  constructor(props) {
    super(props)
    this.state = { count: 1 }
    this.handleClickNum = this.handleClickNum.bind(this)
  }
  handleClickNum(count, evt) {
    evt.preventDefault() 
    this.setState({ count })
  }
  renderNums() {
    return [1, 2, 3, 4, 5].map(num => {
      const className = num === this.state.count ? css.numActive : css.num
      return (
        <button className={className}
                key={num}
                onClick={this.handleClickNum.bind(null, num)}>{num}</button>
      )
    })
  }
  renderInput() {
    return React.cloneElement(this.props.children, {
      style: {}, // TODO: hide
      value: this.state.count
    })
  }
  render() {
    return (
      <div className={css.root}>
        {this.renderNums()}
        {this.renderInput()}
      </div>
    )
  }
}
Number.propTypes = {
  children: node.isRequired
}

export default Number
