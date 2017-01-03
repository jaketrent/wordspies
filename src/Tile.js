import React from 'react'
import css from './Tile.css'

const { bool, func, shape, string } = React.PropTypes

class Tile extends React.Component {
  getClassName() {
    const colors = {
      r: css.colorRed,
      rk: css.colorRedKeyed,
      b: css.colorBlue,
      bk: css.colorBlueKeyed,
      n: css.colorNeutral,
      nk: css.colorNeutralKeyed,
      a: css.colorAssassin,
      ak: css.colorAssassinKeyed
    }

    return this.props.tile.faceup
      ? colors[this.props.tile.color]
      : this.props.keyed
        ? colors[this.props.tile.color + 'k']
        : css.root
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
  keyed: bool,
  onClick: func,
  tile: shape({
    color: string.isRequired,
    faceup: bool.isRequired,
    word: string.isRequired
  })
}

export default Tile
