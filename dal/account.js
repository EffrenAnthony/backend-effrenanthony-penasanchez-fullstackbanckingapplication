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

module.exports = {
  createAccount
}