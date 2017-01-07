const uuid = require('node-uuid')

function generateId() {
  return uuid.v4().substring(0, 7)
}

function serialize(game) {
  return [
    game.id,
    JSON.stringify(game)
  ]
}

function deserialize(row) {
  return row.state
}

function lookup(db, gameId) {
  return new Promise((resolve, reject) => {
    db.games.findOne({ id: gameId }, (err, game) => {
      if (err) return reject(err)

      resolve(deserialize(game))
    })
  })
}

function save(db, game) {
  const gameWithId = game.id
    ? game
    : Object.assign({}, game, { id: generateId() })

  return new Promise((resolve, reject) => {
    db.gamesUpsert(serialize(gameWithId), err => {
      if (err) return reject(err)

      resolve(gameWithId)
    })
  })
}

exports.lookup = lookup
exports.save = save
