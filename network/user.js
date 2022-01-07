const express = require('express')
const router = express.Router()
const response = require('../routes/response')
const { config } = require('../config')
const UserModel = require('../models/user')
const jwt = require('jsonwebtoken')
const UserController = require('../controllers/user')

function generateToken (user) {
  return jwt.sign({
    userId: user.userId,
    userType: user.userType,
    email: user.email,
    picture: user.picture,
    name: user.name
  }, config.SECRET_KEY
    // { expiresIn: '4h' }
  )
}

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

router.post('/auth', (req, res) => {
  const user = {
    userId: req.body.userId,
    userType: req.body.userType,
    email: req.body.email,
    picture: req.body.picture,
    name: req.body.name
  }
  try {
    const token = generateToken(user)
    response.success(req, res, token, 200)
  } catch (error) {
    response.error(req, res, error, 'Unexpected Error', 500)
  }
})

router.post('/', verifyUser, async function (req, res) {
  try {
    const userData = getDataFromToken(req)
    const user = await UserController.getUserByEmail(userData.email)
    response.success(req, res, user, 200)
  } catch (error) {
    response.error(req, res, error, 'Unexpected Error', 500)
  }
})

module.exports = router
