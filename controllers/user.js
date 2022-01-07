const AccountController = require('../controllers/account')
const UserStore = require('../dal/user')

async function createUser (email, fullName, userType, profilePhoto) {
  const newAccount = await AccountController.createAccount('savings')
  const accounts = [newAccount]
  const newUser = {
    email,
    fullName,
    userType,
    profilePhoto,
    createdAt: new Date().toISOString(),
    accounts
  }

  const user = await UserStore.createUser(newUser)
  return user
}

async function getUserByEmail (email) {
  const user = await UserStore.getUserByEmail(email)
  return user
}

module.exports = {
  createUser,
  getUserByEmail
}
