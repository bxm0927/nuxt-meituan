const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MenuSchema = new Schema({
  menu: {
    type: Array,
    require: true,
  },
})

module.exports = mongoose.model('Menu', MenuSchema)
