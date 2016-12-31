import React from 'react'
import css from './Tile.css'

const { bool, func, shape, string } = React.PropTypes

class Tile extends React.Component {
  getClassName() {
    const colors = {
      r: css.colorRed,
      b: css.colorBlue,
      n: css.colorNeutral,
      a: css.colorAssassin,
    }
    return this.props.tile.faceup ? colors[this.props.tile.color] : css.root
  }
  render() {
    return (
      <div onClick={this.props.onClick} className={this.getClassName()}>
        {this.props.tile.word}
      </div>
    )
  }
}
Tile.propTypes = {
  onClick: func.isRequired,
  tile: shape({
    color: string.isRequired,
    faceup: bool.isRequired,
    word: string.isRequired
  })
}

export default Tile
