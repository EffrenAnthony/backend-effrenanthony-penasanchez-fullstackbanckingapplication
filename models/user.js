const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mySchema = new Schema({
  email: String,
  fullName: String,
  userType: String,
  profilePhoto: String,
  accounts: [{
    type: Schema.ObjectId,
    ref: 'Account'
  }],
  createdAt: String,
  uid: String
})

const model = mongoose.model('User', mySchema)
module.exports = model
