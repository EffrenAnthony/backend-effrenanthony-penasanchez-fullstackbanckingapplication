const response = require('../routes/response')
const { config } = require('../config')
const UserModel = require('../models/user')
const jwt = require('jsonwebtoken')
const UserController = require('../controllers/user')

const verifyUser = async (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization) throw new Error('You must send an Authorization header')

  const [authType, token] = authorization.trim().split(' ')
  if (authType !== 'Bearer') throw new Error('Expected a Bearer token')
  try {
    let userFromToken
    jwt.verify(token, config.SECRET_KEY, (_, decoded) => {
      userFromToken = decoded
    })
    const user = await UserModel.findOne({ email: userFromToken.email })
    if (user) {
      const haveValidPermissions = user.userType === userFromToken.userType
      if (haveValidPermissions) {
        next()
      } else {
        response.error(req, res, "User don't have permissions of " + userFromToken.userType, 500)
      }
    } else {
      const newUser = await UserController.createUser(
        userFromToken.email,
        userFromToken.name,
        userFromToken.userType,
        userFromToken.picture)
      console.log(newUser)
      response.success(req, res, newUser, 200)
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  verifyUser
}
