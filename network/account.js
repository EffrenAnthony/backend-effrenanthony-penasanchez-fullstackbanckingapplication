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

router.post('/transfer', verifyUser, async function (req, res) {
  try {
    const accountIdFrom = req.body.accountIdFrom
    const accountNumberTo = req.body.accountNumberTo
    const newBalanceFrom = req.body.newBalanceFrom
    const amount = req.body.amount
    const updatedAccount = await AccountController.transfer(accountIdFrom, accountNumberTo, newBalanceFrom, amount)
    if (updatedAccount) {
      response.success(req, res, updatedAccount, 200)
    } else {
      response.error(req, res, 'Account not found', 500)
    }
  } catch (error) {
    response.error(req, res, error, 500)
  }
})

router.delete('/:id', verifyUser, async function (req, res) {
  try {
    const accountId = req.params.id
    const deletedAccount = await AccountController.deleteAccount(accountId)
    response.success(req, res, deletedAccount, 200)
  } catch (error) {
    response.error(req, res, error, 'Unexpected Error', 500)
  }
})

module.exports = router
