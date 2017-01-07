const path = require('path')
const massive = require('massive')

exports.connect = function connect(done) {
  massive.connect({
    connectionString: process.env.DB_CONN_URL,
    scripts: path.join(__dirname, 'queries')
  }, (err, db) => {
    if (err) {
      log.fatal({ err }, 'db conn error')
      throw err
    }

    done(null, db)
  })
}
