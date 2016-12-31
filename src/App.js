import React, { Component } from 'react'
import logo from './logo.svg'
import css from './App.css'
import words from './words'

class App extends Component {
  constructor(props) {
    super(props)
    this.renderWord = this.renderWord.bind(this)
  }
  renderWord(word) {
    
  }
  renderWords() {
    return words.map(this.renderWord)
  }
  render() {
    return (
      <div className={css.root}>
        {this.renderWords()}
        <div className={css.header}>
        <img src={logo} className={css.logo} alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className={css.intro}>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    )
  }
}

export default App
