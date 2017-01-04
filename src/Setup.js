import DocumentTitle from 'react-document-title'
import { Link } from 'react-router'
import React, { Component } from 'react'

import Title from './Title'
import css from './Setup.css'
import game from './game'

const { shape, string } = React.PropTypes

class Setup extends Component {
  constructor(props) {
    super(props)
    this.state = { game: null }
  }
  componentWillMount() {
    game.lookup(this.props.params.gameId)
      .then(g => this.setState({ game: g }))
  }
  render() {
    const gameId = this.props.params.gameId
    return (
      <DocumentTitle title="Choose your role | WordSpies">
        <div className={css.root}>
          <Title>Choose your role</Title>
          <div className={css.links}>
            <Link className={css.link} to={'/games/' + gameId + '/agents'}>Agent</Link>
            <Link className={css.link} to={'/games/' + gameId + '/codemasters/red'}>Red Codemaster</Link>
            <Link className={css.link} to={'/games/' + gameId + '/codemasters/blue'}>Blue Codemaster</Link>
          </div>
          <p className={css.instructions}>
            Share this link with other players so they can join on their own devices.
          </p>
        </div>
      </DocumentTitle>
    )
  }
}
Setup.propTypes = {
  params: shape({
    gameId: string.isRequired
  })
}

export default Setup
