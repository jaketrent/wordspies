import React from 'react'
import Tile from './Tile'
import css from './Board.css'

const { arrayOf, bool, func, object } = React.PropTypes

class Board extends React.Component {
  renderTile(tile, i) {
    return <Tile key={i}
                 onClick={this.props.onClickTile ? this.props.onClickTile.bind(null, i) : null}
                 keyed={this.props.keyed}
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
  onClickTile: func,
  keyed: bool,
  tiles: arrayOf(object)
}

export default Board
