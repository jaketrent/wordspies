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
      phase: 'playing',
      playCount: 0,
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
  const updatedTile = Object.assign({}, tile, { faceup: true })

  tiles.splice(i, 1, updatedTile)

  return Object.assign({}, game, {
    lastPlayedTile: updatedTile,
    playCount: game.playCount + 1,
    tiles
  })
}

function resetTurn(game) {
  return Object.assign({}, game, {
    hint: null,
    lastPlayedTile: null,
    playCount: 0,
    turn: game.turn === 'r' ? 'b' : 'r'
  })
}

function switchTurn(game) {
  const outOfPlays = game.playCount >= game.hint.count + 1
  const choseIncorrectTile = game.lastPlayedTile.color !== game.turn
  return outOfPlays || choseIncorrectTile
    ? resetTurn(game)
    : Object.assign({}, game, {
        lastPlayedTile: null
      })
}

function endTurn(game) {
  return resetTurn(game)
}

function advanceGame(game, i) {
  let state = turnTileFaceup(game, i)
  state = checkPhaseChange(state)

  if (state.phase === 'playing') {
    state = switchTurn(state)
  }

  return state
}

function giveHint(game, hint) {
  return Object.assign({}, game, {
    hint
  })
}

function currentTeamWon(game) {
  return game.tiles
    .filter(t => t.color === game.turn)
    .filter(t => !t.faceup)
    .length === 0
}

function assassinFaceup(game) {
  return game.tiles
    .filter(t => t.color === 'a' && t.faceup)
    .length > 0
}

function checkPhaseChange(game) {
  return assassinFaceup(game)
    ? Object.assign({}, game, { phase: 'gameover' })
    : currentTeamWon(game)
      ? Object.assign({}, game, { phase: 'won' })
      : game
}

exports.turnTileFaceup = turnTileFaceup
exports.switchTurn = switchTurn
exports.advanceGame = advanceGame
exports.create = create
exports.giveHint = giveHint
exports.endTurn = endTurn
exports.checkPhaseChange = checkPhaseChange
