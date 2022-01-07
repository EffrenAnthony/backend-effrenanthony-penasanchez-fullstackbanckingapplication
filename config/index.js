require('dotenv').config()

const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 3100,
  cors: process.env.CORS,
  host: process.env.HOST || 'localhost',
  SECRET_KEY: process.env.SECRET_KEY || 'SECRET',
  auth0Domain: process.env.AUTH0_DOMAIN,
  auth0ClientId: process.env.AUTH0_CLIENT_ID,
  auth0ClientSecret: process.env.AUTH0_CLIENT_SECRET
}

config.mongodb = process.env.MONGODB
module.exports = { config }
