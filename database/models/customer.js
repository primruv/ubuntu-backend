const mongoose = require('mongoose')
const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    minlength: 3

  },
  appleId: {
    type: String,
    trim: true,
    minlength: 3

  },
  phoneNumber: {
    type: Number


  },
  password: {
    type: String,
    trim: true

  },
  plan: {
    type: String
  },
  refferalCode: { type: String }
})

const Customer = mongoose.model('Customer', CustomerSchema)

module.exports = Customer