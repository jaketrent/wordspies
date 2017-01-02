const koa = require('koa')
const logger = require('koa-logger')
const route = require('koa-route')
const cors = require('koa-cors')

const store = require('./store')
const game = require('./game')

const app = koa()
const port = process.env.PORT || 3001

app.use(logger())
app.use(cors())

app.use(route.post('/games', function* create() {
  this.body = store.save(game.create())
}))

app.use(route.get('/games/:gameId', function* find(gameId) {
  this.body = store.lookup(gameId)
}))

app.use(route.post('/games/:gameId/cards/:index', function* create(gameId, index) {
  this.body = store.save(game.advanceGame(store.lookup(gameId), index))
}))

app.listen(port)
