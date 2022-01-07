const user = require('../network/user')

const routes = function (server) {
  server.use('/user', user)
}

module.exports = routes
