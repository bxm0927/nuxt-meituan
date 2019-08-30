const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Cart = new Schema({
  id: {
    type: String,
    require: true,
  },
  detail: {
    type: Array,
    require: true,
  },
  cartNo: {
    type: String,
    require: true,
  },
  user: {
    type: String,
    require: true,
  },
  time: {
    type: Date,
    require: true,
  },
})

module.exports = mongoose.model('Cart', Cart)
