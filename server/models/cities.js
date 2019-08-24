const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CitiesSchema = new Schema({
  id: {
    type: String,
    unique: true,
    require: true,
  },
  value: {
    type: Array,
    require: true,
  },
})

module.exports = mongoose.model('Cities', CitiesSchema)
