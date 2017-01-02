
function turnTileFaceup(game, i) {
  const tile = game.tiles[i]
  const tiles = game.tiles.slice(0)
  tiles.splice(i, 1, { ...tile, faceup: true })
  return {
    ...game,
    tiles
  }
}

function switchTurn(game) {
  return {
    ...game,
    guess: {
      count: 1
    },
    turn: game.turn === 'r' ? 'b' : 'r'
  }
}

function advanceGame(game, i) {
  let state = turnTileFaceup(game, i)
  state = switchTurn(state)
  return state
}

function setGuessCount(game, count) {
  return {
    ...game,
    guess: {
      count
    }
  }
}

exports.turnTileFaceup = turnTileFaceup
exports.switchTurn = switchTurn
exports.advanceGame = advanceGame
exports.setGuessCount = setGuessCount
