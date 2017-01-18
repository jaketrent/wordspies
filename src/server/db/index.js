const config = require('../config')

const path = require('path')
const massive = require('massive')

exports.connect = function connect(done) {
  massive.connect({
    connectionString: config.dbConnUrl,
    scripts: path.join(__dirname, 'queries')
  }, (err, db) => {
    if (err) {
      console.log('db conn error', err)
      throw err
    }

    done(null, db)
  })
}
