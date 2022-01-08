const user = require('../network/user')
const account = require('../network/account')

const routes = function (server) {
  server.use('/user', user)
  server.use('/account', account)
}

module.exports = routes
