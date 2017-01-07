import { Link } from 'react-router'
import React from 'react'

import css from './Menu.css'

const { string } = React.PropTypes

class Menu extends React.Component {
  render() {
    const { gameId } = this.props
    return (
      <nav className={css.root}>
        <Link className={css.link} to={'/games/' + gameId + '/codemasters/red'}>Red Codemaster</Link>
        <Link className={css.link} to={'/games/' + gameId + '/codemasters/blue'}>Blue Codemaster</Link>
      </nav>
    )
  }
}
Menu.propTypes = {
  gameId: string.isRequired
}

export default Menu
