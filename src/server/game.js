const defaultWords = require('./words')
const defaultLayouts = require('./layouts')

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// from http://stackoverflow.com/questions/18806210/generating-non-repeating-random-numbers-in-js
function shuffle(array) {
  let i = array.length
  let j = 0
  let temp

  while (i--) {
    j = Math.floor(Math.random() * (i + 1))

    temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }

  return array
}

function findUniqueRandomWords(words, count) {
  return shuffle(words.slice(0)).slice(0, count)
}

function create(layouts = defaultLayouts, words = defaultWords) {
  const layout = layouts[randInt(0, layouts.length - 1)]
  const randomWords = findUniqueRandomWords(words, layout.tiles.length)
  return Object.assign({},
    layout,
    {
      guess: {
        count: 1
      },
      tiles: layout.tiles.map((color, i) => ({
        color,
        faceup: false,
        word: randomWords[i]
      })),
      turn: layout.first
  })
}

function turnTileFaceup(game, i) {
  const tile = game.tiles[i]
  const tiles = game.tiles.slice(0)
  tiles.splice(i, 1, Object.assign({}, tile, { faceup: true }))
  return Object.assign({}, game, {
    tiles
  })
}

function switchTurn(game) {
  return Object.assign({}, game, {
    guess: {
      count: 1
    },
    turn: game.turn === 'r' ? 'b' : 'r'
  })
}

function advanceGame(game, i) {
  let state = turnTileFaceup(game, i)
  state = switchTurn(state)
  return state
}

function setGuessCount(game, count) {
  return Object.assign({}, game, {
    guess: {
      count
    }
  })
}

exports.turnTileFaceup = turnTileFaceup
exports.switchTurn = switchTurn
exports.advanceGame = advanceGame
exports.setGuessCount = setGuessCount
exports.create = create
