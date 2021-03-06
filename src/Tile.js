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
        : css.tile

  }
  renderWord() {
    return this.props.tile.faceup
      ? '\u00a0'
      : this.props.tile.word
  }
  render() {
    return (
      <div onClick={this.props.onClick} className={css.root}>
        <div className={this.getClassName()}>
          {this.renderWord()}
        </div>
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
