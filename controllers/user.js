const AccountController = require('../controllers/account')
const UserStore = require('../dal/user')

async function createUser (email, fullName, userType, profilePhoto) {
  try {
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
  } catch (error) {
    console.log(error)
  }
}

async function getUserByEmail (email) {
  try {
    const user = await UserStore.getUserByEmail(email)
    return user
  } catch (error) {
    console.log(error)
  }
}

async function addNewAccount (userId, accountType) {
  try {
    const newAccount = await AccountController.createAccount(accountType)
    const updatedUser = await UserStore.addNewAccount(userId, newAccount)
    return updatedUser
  } catch (error) {
    console.log(error)
  }
}

async function getUsers () {
  try {
    const users = await UserStore.getUsers()
    return users
  } catch (error) {
    console.log(error)
  }
}
module.exports = {
  createUser,
  getUserByEmail,
  addNewAccount,
  getUsers
}
