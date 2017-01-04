import React from 'react'

import css from './Title.css'

class Title extends React.Component {
  render() {
    return <h1 className={css.root}>{this.props.children}</h1>
  }
}

export default Title
