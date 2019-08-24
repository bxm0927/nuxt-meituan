const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PoisSchema = new Schema({
  name    : { type: String, require: true },
  province: { type: String, require: true },
  city    : { type: String, require: true },
  county  : { type: String, require: true },
  areaCode: { type: Number, require: true },
  tel     : { type: String, require: true },
  area    : { type: String, require: true },
  add     : { type: String, require: true },
  type    : { type: String, require: true },
  module  : { type: String, require: true },
  longtide: { type: Number, require: true },
  latitude: { type: Number, require: true },
})

module.exports = mongoose.model('Pois', PoisSchema)
