// use this url to create avatar https://avatars.dicebear.com/api/bottts/1ds23sda.svg

const Model = require('../models/account')

async function createAccount (account) {
  try {
    const newAccount = await new Model(account)
    return newAccount.save()
  } catch (error) {
    console.log(error)
  }
}

async function updateBalance (accountId, newBalance) {
  try {
    const updatedAccount = await Model.findById(accountId)
    updatedAccount.balance = newBalance
    await updatedAccount.save()
    return updatedAccount
  } catch (error) {
    console.log(error)
  }
}

async function deleteAccount (accountId) {
  try {
    const account = await Model.findById(accountId)
    await account.remove()
    return account
  } catch (error) {
    console.log(error)
  }
}

async function getAccountFromNumber (number) {
  try {
    const account = await Model.findOne({ number })
    await account
    return account
  } catch (error) {
    console.log(error)
  }
}

async function transfer (accountIdFrom, accountIdTo, newBalanceFrom, newBalanceTo) {
  try {
    const updatedAccountFrom = await updateBalance(accountIdFrom, newBalanceFrom)
    await updateBalance(accountIdTo, newBalanceTo)
    return updatedAccountFrom
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  createAccount,
  updateBalance,
  deleteAccount,
  transfer,
  getAccountFromNumber
}
