const AccountStore = require('../dal/account')
const randomString = require('../utils/randomString')

async function createAccount (accountType) {
  try {
    const accountModel = {
      accountType: accountType,
      number: Math.floor(Math.random() * 100000000000),
      avatar: `https://avatars.dicebear.com/api/identicon/${randomString(10)}.svg`,
      balance: 0,
      createdAt: new Date().toISOString()
    }

    const newAccount = await AccountStore.createAccount(accountModel)
    return newAccount
  } catch (error) {
    console.log(error)
  }
}

async function updateBalance (accountId, newBalance) {
  try {
    const updatedAccount = await AccountStore.updateBalance(accountId, newBalance)
    return updatedAccount
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  createAccount,
  updateBalance
}
