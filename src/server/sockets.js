const game = require('./game')
const store = require('./store')

const ios = {}

function handleAgentPlay(db, io, data) {
  const { gameId, index } = data
  store.lookup(db, gameId)
    .then(g => game.advanceGame(g, index))
    .then(g => store.save(db, g))
    .then(g => io.of('/' + gameId).emit('game-updated', g))
}

function handleCodemasterHint(db, io, data) {
  const { gameId, hint } = data
  store.lookup(db, gameId)
    .then(g => game.giveHint(g, hint))
    .then(store.save.bind(null, db))
    .then(g => io.of('/' + gameId).emit('game-updated', g))
}

function handleEndTurn(db, io, data) {
  const { gameId } = data
  store.lookup(db, gameId)
    .then(game.endTurn)
    .then(store.save.bind(null, db))
    .then(g => io.of('/' + gameId).emit('game-updated', g))
}

function setup(db, io, game) {
  if (ios[game.id]) return game

  const nsp = io.of('/' + game.id)
  nsp.on('connection', socket => {
    const handleAgentPlayInNsp = handleAgentPlay.bind(null, db, io)
    const handleCodemasterHintInNsp = handleCodemasterHint.bind(null, db, io)
    const handleEndTurnInNsp = handleEndTurn.bind(null, db, io)

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

  ios[game.id] = nsp

  return game
}

exports.setup = setup
