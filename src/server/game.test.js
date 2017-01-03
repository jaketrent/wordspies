import assert from 'assert'
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

  it('has a starting hint of null', () => {
    const actual = subject.create(layouts, words)
    assert.equal(actual.hint, null)
  })

  it('has a starting playCount of 0', () => {
    const actual = subject.create(layouts, words)
    assert.equal(actual.playCount, 0)
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

  it('increments playCount', () => {
    const game = {
      playCount: 1,
      tiles: [{ faceup: true}, { faceup: false }]
    }

    const actual = subject.turnTileFaceup(game, 1)

    assert.equal(actual.playCount, 2)
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

  it('resets hint to null', () => {
    const game = {
      hint: { word: 'someword', count: 3 }
    }
    let actual = subject.switchTurn(game)
    assert.equal(actual.hint, null)
  })

  it('resets playCount to 0', () => {
    const game = {
      playCount: 3
    }
    let actual = subject.switchTurn(game)
    assert.equal(actual.playCount, 0)
  })

})

describe('#giveHint', () => {

  it('sets hint on game', () => {
    const game = {}
    const hint = {
      word: 'theword',
      count: 3
    }
    const actual = subject.giveHint(game, hint)
    assert.equal(actual.hint.word, hint.word)
    assert.equal(actual.hint.count, hint.count)
  })

})
