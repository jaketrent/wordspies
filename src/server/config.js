if (process.env.NODE_ENV !== 'production')
  require('dotenv').config()

module.exports = {
  dbConnUrl: process.env.DATABASE_URL || process.env.DB_CONN_URL,
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3001
}
