import React from 'react'
import Tile from './Tile'
import css from './Board.css'

class Board extends React.Component {
  renderTile(tile, i) {
    return <Tile key={i} tile={tile} />
  }
  renderTiles() {
    return this.props.tiles.map((t, i) => this.renderTile(t, i))
  }
  render() {
    return (
      <div className={css.root}>
        {this.renderTiles()}
      </div>
    )
  }
}

export default Board
