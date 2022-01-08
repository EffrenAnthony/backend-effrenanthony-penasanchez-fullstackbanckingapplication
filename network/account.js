const express = require('express')
const router = express.Router()
const response = require('../routes/response')
const AccountController = require('../controllers/account')
const { verifyUser } = require('../utils/middlewares')
// const { getDataFromToken } = require('../utils/helpers')

router.post('/', verifyUser, async function (req, res) {
  try {
    const accountId = req.body.accountId
    const newBalance = req.body.newBalance
    const updatedAccount = await AccountController.updateBalance(accountId, newBalance)
    response.success(req, res, updatedAccount, 200)
  } catch (error) {
    response.error(req, res, error, 'Unexpected Error', 500)
  }
})

module.exports = router
