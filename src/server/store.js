const uuid = require('node-uuid')

const games = {}

function generateId() {
  return uuid.v4().substring(0, 7)
}

function lookup(gameId) {
  return games[gameId]
}

function save(game) {
  const id = game.id ? game.id : generateId()
  const gameWithId = Object.assign({}, game, { id })
  games[id] = gameWithId
  return gameWithId
}

exports.save = save
exports.lookup = lookup
