const Model = require('../models/user')

// --------------------- User DAL methods -----------------------------

async function createUser (user) {
  try {
    const newUser = new Model({
      ...user
    })
    await newUser.save()
    return new Promise((resolve, reject) => {
      Model.findById({ _id: newUser._id })
        .populate('accounts')
        .exec((error, populated) => {
          if (error) {
            reject(Error(error))
          }
          resolve(populated)
        })
    })
  } catch (error) {
    console.log(error)
  }
}

async function getUserByEmail (email) {
  const user = await Model.findOne({ email })
  return new Promise((resolve, reject) => {
    Model.findById({ _id: user._id })
      .populate('accounts')
      .exec((error, populated) => {
        if (error) {
          reject(Error(error))
        }
        resolve(populated)
      })
  })
}
// --------------------- Utils -----------------------------
async function getUser (id) {
  const user = await Model.findById(id)
  return new Promise((resolve, reject) => {
    Model.findById({ _id: user._id })
      .populate('accounts')
      .exec((error, populated) => {
        if (error) {
          reject(Error(error))
        }
        resolve(populated)
      })
  })
}

// async function verifyUser (id) {
//   const user = await Model.findById(id)
//   return user
// }

// async function verifyUserType (id) {

// }

module.exports = {
  getUser,
  createUser,
  getUserByEmail
}
