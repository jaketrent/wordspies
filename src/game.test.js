import assert from 'assert'
import React from 'react'
import ReactDOM from 'react-dom'
import subject from './game'
import layouts from './layouts'
import words from './words'

describe('#create', () => {

  it('returns a game with tiles', () => {
    assert(Array.isArray(subject.create(layouts, words).tiles))
  })

  it('returns a game with a turn matching the layouts first player', () => {
    assert(['r', 'b'].includes(subject.create(layouts, words).turn))
  })

  it('returns a game with 25 tiles', () => {
    assert.equal(subject.create(layouts, words).tiles.length, 25)
  })

  it('assigns a word to each tile', () => {
    const actual = subject.create(layouts, words).tiles
    assert.equal(actual.length, 25)
    actual.forEach(t => {
      assert(typeof t.word === 'string')
    })
  })

  it('assigns a color to each tile', () => {
    const actual = subject.create(layouts, words).tiles
    assert.equal(actual.length, 25)
    actual.forEach(t => {
      assert(['r', 'b', 'n', 'a'].includes(t.color))
    })
  })

  it('assigns a faceup false to each tile', () => {
    const actual = subject.create(layouts, words).tiles
    assert.equal(actual.length, 25)
    actual.forEach(t => {
      assert.equal(t.faceup, false)
    })
  })

})

describe('#turnTileFaceup', () => {

  it('sets faceup on just the specified tile', () => {
    const index = 1
    const game = {
      tiles: [
        { faceup: false },
        { faceup: false },
        { faceup: false }
      ]
    }

    const actual = subject.turnTileFaceup(game, index)

    assert.equal(actual.tiles.length, game.tiles.length)
    actual.tiles.forEach((t, i) => {
      if (i === index)
        assert.equal(t.faceup, true)
      else
        assert.equal(t.faceup, false)
    })
  })

})

describe('#switchTurn', () => {

  it('flips turn attribute to other team color', () => {
    const index = 1
    const game = {
      turn: 'r'
    }
    let actual = subject.switchTurn(game)
    assert.equal(actual.turn, 'b')

    actual = subject.switchTurn(actual)
    assert.equal(actual.turn, 'r')
  })

})
