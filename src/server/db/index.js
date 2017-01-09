const path = require('path')
const massive = require('massive')

exports.connect = function connect(done) {
  massive.connect({
    connectionString: process.env.DB_CONN_URL,
    scripts: path.join(__dirname, 'queries')
  }, (err, db) => {
    if (err) {
      console.log('db conn error', err)
      throw err
    }

    done(null, db)
  })
}
