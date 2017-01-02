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

  it('has a starting guess of 1 count', () => {
    const actual = subject.create(layouts, words)
    assert.equal(actual.guess.count, 1)
  })

})
