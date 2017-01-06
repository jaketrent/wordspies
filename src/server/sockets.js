const IO = require('koa-socket')

const game = require('./game')
const store = require('./store')

const ios = {}

function handleAgentPlay(io, data) {
  const { gameId, index } = data
  io.of('/' + gameId).emit('game-updated', store.save(game.advanceGame(store.lookup(gameId), index)))
}

function handleCodemasterHint(io, data) {
  const { gameId, hint } = data
  io.of('/' + gameId).emit('game-updated', store.save(game.giveHint(store.lookup(gameId), hint)))
}

function handleEndTurn(io, data) {
  const { gameId } = data
  io.of('/' + gameId).emit('game-updated', store.save(game.endTurn(store.lookup(gameId))))
}

function setup(gameId, io) {
  const nsp = io.of('/' + gameId)
  nsp.on('connection', socket => {
    const handleAgentPlayInNsp = handleAgentPlay.bind(null, io)
    const handleCodemasterHintInNsp = handleCodemasterHint.bind(null, io)
    const handleEndTurnInNsp = handleEndTurn.bind(null, io)

    socket.on('agent-play', handleAgentPlayInNsp)
    socket.on('codemaster-hint', handleCodemasterHintInNsp)
    socket.on('end-turn', handleEndTurnInNsp)

    socket.on('disconnect', _ => {
      // off not a fn
      // nsp.off('create', handleCreateInNsp)
      // nsp.off('agent-play', handleAgentPlayInNsp)
      // nsp.off('codemaster-hint', handleCodemasterHintInNsp)
      // nsp.off('end-turn', handleEndTurnInNsp)
    })
  })

  ios[gameId] = nsp
}

exports.setup = setup
