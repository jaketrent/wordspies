const bodyParser = require('koa-bodyparser')
const http = require('http')
const koa = require('koa')
const socketio = require('socket.io')
const logger = require('koa-logger')
const route = require('koa-route')
const cors = require('koa-cors')

const store = require('./store')
const game = require('./game')
const sockets = require('./sockets')

const app = koa()
const server = http.createServer(app.callback())
const io = socketio(server)

const port = process.env.PORT || 3001

app.use(logger())
app.use(bodyParser())
app.use(cors())

app.use(route.post('/games', function* create() {
  const g = store.save(game.create())
  sockets.setup(g.id, io)
  this.body = g
}))

app.use(route.get('/games/:gameId', function* find(gameId) {
  this.body = store.lookup(gameId)
}))

io.attach(app)

server.listen(port)
