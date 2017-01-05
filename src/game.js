import axios from 'axios'
import io from 'socket.io-client'

const sockets = {}

function getSocket(gameId) {
  if (!sockets[gameId])
    sockets[gameId] = io('http://localhost:3001/' + gameId)

  return sockets[gameId]
}

function create() {
  return axios.post('http://localhost:3001/games')
    .then(res => res.data)
}

function lookup(gameId) {
  return axios.get('http://localhost:3001/games/' + gameId)
    .then(res => res.data)
}

function agentPlay(gameId, index) {
  getSocket(gameId).emit('agent-play', { gameId, index })
}

function codemasterHint(gameId, hint) {
  getSocket(gameId).emit('codemaster-hint', { gameId, hint })
}

function endTurn(gameId) {
  getSocket(gameId).emit('end-turn', { gameId })
}

function listenGameUpdated(gameId, fn) {
  getSocket(gameId).on('game-updated', fn)
}

function unlistenGameUpdated(gameId, fn) {
  getSocket(gameId).off('game-updated', fn)
}

exports.create = create
exports.lookup = lookup
exports.agentPlay = agentPlay
exports.endTurn = endTurn
exports.codemasterHint = codemasterHint
exports.listenGameUpdated = listenGameUpdated
exports.unlistenGameUpdated = unlistenGameUpdated
