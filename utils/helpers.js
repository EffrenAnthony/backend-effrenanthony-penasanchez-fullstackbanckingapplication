const { config } = require('../config')
const jwt = require('jsonwebtoken')

const getDataFromToken = (req) => {
  const { authorization } = req.headers
  const [authType, token] = authorization.trim().split(' ')
  if (authType !== 'Bearer') throw new Error('Expected a Bearer token')
  let userFromToken
  jwt.verify(token, config.SECRET_KEY, (_, decoded) => {
    userFromToken = decoded
  })
  return userFromToken
}

module.exports = {
  getDataFromToken
}
