const uuid = require('node-uuid')

const games = {}

function generateId() {
  return uuid.v4().substring(0, 7)
}

function save(game) {
  const id = generateId()
  games[id] = game
  return Object.assign({}, game, { id })
}

exports.save = save
