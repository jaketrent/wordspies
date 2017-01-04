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

  it('has a starting phase of "playing"', () => {
    const actual = subject.create(layouts, words)
    assert.equal(actual.phase, 'playing')
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

  it('saves lastPlayedTile', () => {
    const index = 1
    const game = {
      playCount: 1,
      tiles: [
        { faceup: true, id: 'tile1' },
        { faceup: false, id: 'tile2' }
      ]
    }

    const actual = subject.turnTileFaceup(game, index)

    assert.equal(actual.lastPlayedTile.id, game.tiles[index].id)
  })

})

describe('#switchTurn', () => {

  it('flips turn attribute to other team color', () => {
    const index = 1
    const game = {
      hint: { count: 3 },
      lastPlayedTile: { color: 'r' },
      playCount: 4,
      turn: 'r'
    }
    let actual = subject.switchTurn(game)
    assert.equal(actual.turn, 'b')
  })

  it('resets hint to null', () => {
    const game = {
      hint: { word: 'someword', count: 3 },
      lastPlayedTile: { color: 'r' },
      playCount: 4
    }
    let actual = subject.switchTurn(game)
    assert.equal(actual.hint, null)
  })

  it('resets playCount to 0', () => {
    const game = {
      hint: { count: 2 },
      lastPlayedTile: { color: 'r' },
      playCount: 3
    }
    let actual = subject.switchTurn(game)
    assert.equal(actual.playCount, 0)
  })

  it('does not switch when team playCount hasnt exceeded hint.count plus one', () => {
    const game = {
      hint: { count: 1 },
      lastPlayedTile: { color: 'r' },
      playCount: 1,
      turn: 'r'
    }

    let actual = subject.switchTurn(game)
    assert.equal(actual.turn, 'r')
  })

  it('switches when the team uses hint.count plays plus one', () => {
    const game = {
      hint: { count: 1 },
      lastPlayedTile: { color: 'r' },
      playCount: 2,
      turn: 'r'
    }

    let actual = subject.switchTurn(game)
    assert.equal(actual.turn, 'b')
  })

  it('switches when the team chooses a tile that doesnt match their color', () => {
    const game = {
      hint: { count: 3 },
      lastPlayedTile: { color: 'b' },
      playCount: 1,
      turn: 'r'
    }

    let actual = subject.switchTurn(game)
    assert.equal(actual.turn, 'b')
  })

  it('does not switch when the team chooses a tile that matches their color', () => {
    const game = {
      hint: { count: 3 },
      lastPlayedTile: { color: 'r' },
      playCount: 1,
      turn: 'r'
    }

    let actual = subject.switchTurn(game)
    assert.equal(actual.turn, 'r')
  })

  it('removes lastPlayedTile in any case', () => {
    const game = {
      hint: { count: 3 },
      lastPlayedTile: { color: 'r' },
      playCount: 1,
      turn: 'r'
    }

    let actual = subject.switchTurn(game)
    assert.equal(actual.lastPlayedTile, null) 
  })

})

describe('#switchTurn', () => {

  it('resets all turn-related data', () => {
    const game = {
      hint: { word: 'something', count: 1 },
      lastPlayedTile: { foo: 'bar' },
      playCount: 1,
      turn: 'r'
    }
    let actual = subject.endTurn(game)
    assert.equal(actual.hint, null)
    assert.equal(actual.lastPlayedTile, null)
    assert.equal(actual.playCount, 0)
    assert.equal(actual.turn, 'b')
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

describe('#checkPhaseChange', () => {

  it('changes to won if all tiles of the active turns color are faceup', () => {
    const game = {
      phase: 'playing',
      tiles: [
        { color: 'r', faceup: true },
        { color: 'b', faceup: false },
        { color: 'r', faceup: true }
      ],
      turn: 'r'
    }
    
    const actual = subject.checkPhaseChange(game)

    assert.equal(actual.phase, 'won')
  })

  it('changes to "gameover" if the assassin tile is faceup', () => {
    const game = {
      phase: 'playing',
      tiles: [
        { color: 'b', faceup: true },
        { color: 'r', faceup: false },
        { color: 'a', faceup: true }
      ],
      turn: 'r'
    }
    
    const actual = subject.checkPhaseChange(game)

    assert.equal(actual.phase, 'gameover')
  })
})
