import React from 'react'
import Tile from './Tile'
import css from './Board.css'

const { func } = React.PropTypes

class Board extends React.Component {
  renderTile(tile, i) {
    return <Tile key={i}
                 onClick={this.props.onClickTile.bind(null, i)}
                 tile={tile} />
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
Board.propTypes = {
  onClickTile: func.isRequired
}

export default Board
