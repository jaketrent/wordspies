import assert from 'assert'
import subject from './game'

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

  it('resets guess count to 1', () => {
    const game = {
      guess: { count: 3 }
    }
    let actual = subject.switchTurn(game)
    assert.equal(actual.guess.count, 1)
  })

})

describe('#setGuessCount', () => {

  it('sets guess count to specifiedd number', () => {
    const game = {
      guess: {
        count: 2
      }
    }
    const newCount = 4
    let actual = subject.setGuessCount(game, newCount)
    assert.equal(actual.guess.count, newCount)
  })

})
