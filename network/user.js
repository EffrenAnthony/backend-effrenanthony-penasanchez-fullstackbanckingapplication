const express = require('express')
const router = express.Router()
const response = require('../routes/response')
const { config } = require('../config')
const jwt = require('jsonwebtoken')
const UserController = require('../controllers/user')
const { verifyUser } = require('../utils/middlewares')
const { getDataFromToken } = require('../utils/helpers')

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
router.get('/', verifyUser, async function (req, res) {
  try {
    const userData = getDataFromToken(req)
    if (userData.userType !== 'employee') {
      response.error(req, res, 'You need permissions', 'Unexpected Error', 500)
      return
    }
    const users = await UserController.getUsers()
    response.success(req, res, users, 200)
  } catch (error) {
    response.error(req, res, error, 'Unexpected Error', 500)
  }
})

router.post('/addAccount', verifyUser, async function (req, res) {
  try {
    const user = await UserController.addNewAccount(req.body.userId, req.body.accountType)
    response.success(req, res, user, 200)
  } catch (error) {
    response.error(req, res, error, 'Unexpected Error', 500)
  }
})

module.exports = router
