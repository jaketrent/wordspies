import axios from 'axios'
import io from 'socket.io-client'

let socket

function getSocket() {
  if (!socket)
    socket = io('http://localhost:3001')

  return socket
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
  getSocket().emit('agent-play', { gameId, index })
}

function codemasterHint(gameId, hint) {
  getSocket().emit('codemaster-hint', { gameId, hint })
}

function endTurn(gameId) {
  getSocket().emit('end-turn', { gameId })
}

function listenGameUpdated(fn) {
  getSocket().on('game-updated', fn)
}

function unlistenGameUpdated(fn) {
  getSocket().off('game-updated', fn)
}

exports.create = create
exports.lookup = lookup
exports.agentPlay = agentPlay
exports.endTurn = endTurn
exports.codemasterHint = codemasterHint
exports.listenGameUpdated = listenGameUpdated
exports.unlistenGameUpdated = unlistenGameUpdated
