import React from 'react'

import css from './Title.css'
import titleImg from './imgs/title.jpg'

const { bool, string } = React.PropTypes

class Title extends React.Component {
  render() {
    return (
      <h1 className={css.root}>
        <img className={this.props.large ? css.imgLarge : css.img} src={titleImg} />
        {this.props.children}
      </h1>
    )
  }
}
Title.propTypes = {
  large: bool
}

export default Title
