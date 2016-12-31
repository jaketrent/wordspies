import React from 'react'
import css from './Tile.css'

const { shape, string } = React.PropTypes

class Tile extends React.Component {
  render() {
    return (
      <div className={css.root}>
        {this.props.tile.word}
      </div>
    )
  }
}
Tile.propTypes = {
  tile: shape({
    color: string.isRequired,
    word: string.isRequired
  })
}

export default Tile
