require('dotenv').config()

const bodyParser = require('koa-bodyparser')
const http = require('http')
const koa = require('koa')
const socketio = require('socket.io')
const logger = require('koa-logger')
const route = require('koa-route')
const cors = require('koa-cors')

const db = require('./db')
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
  this.body = yield store.save(this.db, game.create())
    .then(g => sockets.setup(this.db, io, g))
}))

app.use(route.get('/games/:gameId', function* find(gameId) {
  this.body = yield store.lookup(this.db, gameId)
    .then(g => sockets.setup(this.db, io, g))
}))

// TODO: rm
io.attach(app)

db.connect((err, db) => {
  if (err) throw err

  app.context.db = db
  server.listen(port)
})
