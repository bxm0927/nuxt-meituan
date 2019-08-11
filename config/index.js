/*
 * Configuration File Entry
 * @Author: xiaoming.bai
 * @Date: 2019-08-11 12:08:27
 * @Last Modified by: xiaoming.bai
 * @Last Modified time: 2019-08-11 15:36:15
 */

const dev = require('./dev.config')
const prod = require('./prod.config')

module.exports = process.env.NODE_ENV === 'development' ? dev : prod
