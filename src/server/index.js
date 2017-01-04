const bodyParser = require('koa-bodyparser')
const koa = require('koa')
const IO = require('koa-socket')
const logger = require('koa-logger')
const route = require('koa-route')
const cors = require('koa-cors')

const store = require('./store')
const game = require('./game')

const app = koa()
const io = new IO()

const port = process.env.PORT || 3001

app.use(logger())
app.use(bodyParser())
app.use(cors())

app.use(route.post('/games', function* create() {
  this.body = store.save(game.create())
}))

app.use(route.get('/games/:gameId', function* find(gameId) {
  this.body = store.lookup(gameId)
}))

io.attach(app)

io.on('create', (ctx, data) => {
  io.broadcast('created', store.save(game.create()))
})

io.on('agent-play', (ctx, data) => {
  const { gameId, index } = data
  io.broadcast('game-updated', store.save(game.advanceGame(store.lookup(gameId), index)))
})

io.on('codemaster-hint', (ctx, data) => {
  const { gameId, hint } = data
  io.broadcast('game-updated', store.save(game.giveHint(store.lookup(gameId), hint)))
})

io.on('end-turn', (ctx, data) => {
  const { gameId } = data
  io.broadcast('game-updated', store.save(game.endTurn(store.lookup(gameId))))
})

app.listen(port)
