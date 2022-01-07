const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mySchema = new Schema({
  accountType: String,
  number: Number,
  avatar: String,
  balance: Number,
  createdAt: String
})

const model = mongoose.model('Account', mySchema)
module.exports = model
