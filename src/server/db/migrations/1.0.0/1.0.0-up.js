exports.up = (db, options, done) => {
  db.createGamesTable((err, result) => {
    if (err) console.error('1.0.0-up error', err)
    else console.log('1.0.0-up success', result)
    done(err)
  })
}
