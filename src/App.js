import DocumentTitle from 'react-document-title'
import React, { Component } from 'react'

import css from './App.css'
import game from './game'
import Title from './Title'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { game: null }
    this.handleClickCreate = this.handleClickCreate.bind(this)
  }
  handleClickCreate() {
    game.create()
      .then(g => window.location = '/games/' + g.id)
  }
  render() {
    return (
      <DocumentTitle title="Create new game | WordSpies">
        <div className={css.root}>
          <Title large={true} />
          <button className={css.btn} onClick={this.handleClickCreate}>Create game</button>
        </div>
      </DocumentTitle>
    )
  }
}

export default App
