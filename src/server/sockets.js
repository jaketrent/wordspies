const IO = require('koa-socket')

const game = require('./game')
const store = require('./store')

const ios = {}

function handleCreate(io, ctx, data) {
  io.broadcast('created', store.save(game.create()))
}

function handleAgentPlay(io, ctx, data) {
  const { gameId, index } = data
  io.broadcast('game-updated', store.save(game.advanceGame(store.lookup(gameId), index)))
}

function handleCodemasterHint(io, ctx, data) {
  const { gameId, hint } = data
  io.broadcast('game-updated', store.save(game.giveHint(store.lookup(gameId), hint)))
}

function handleEndTurn(io, ctx, data) {
  const { gameId } = data
  io.broadcast('game-updated', store.save(game.endTurn(store.lookup(gameId))))
}

function setup(gameId, app) {
  const io = new IO({
    namespace: gameId
  })

  io.attach(app)

  io.on('create', handleCreate.bind(null, io))
  io.on('agent-play', handleAgentPlay.bind(null, io))
  io.on('codemaster-hint', handleCodemasterHint.bind(null, io))
  io.on('end-turn', handleEndTurn.bind(null, io))

  ios[gameId] = io
}

exports.setup = setup
