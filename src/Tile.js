import React from 'react'
import css from './Tile.css'

const { bool, func, shape, string } = React.PropTypes

class Tile extends React.Component {
  render() {
    return (
      <div onClick={this.props.onClick} className={css.root}>
        {this.props.tile.word} {this.props.tile.faceup ? '(' + this.props.tile.color + ')' : ''}
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
