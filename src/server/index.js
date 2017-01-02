const koa = require('koa')
const route = require('koa-route')
const cors = require('koa-cors')

const store = require('./store')
const game = require('./game')

const app = koa()
const port = process.env.PORT || 3001

app.use(cors())
app.use(route.post('/games', function* create() {
  this.body = store.save(game.create())
}))

app.listen(port)
