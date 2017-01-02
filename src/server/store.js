const uuid = require('node-uuid')

const games = {}

function save(game) {
  games[uuid.v4()] = game
  return game
}

exports.save = save
