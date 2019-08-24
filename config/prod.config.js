/*
 * Production Environment Configuration
 * @Author: xiaoming.bai
 * @Date: 2019-08-11 12:08:27
 * @Last Modified by: xiaoming.bai
 * @Last Modified time: 2019-08-24 12:00:44
 */

const baseConfig = require('./base.config')
const prodConfig = {
  mode: 'production',
  server: {
    port: 3000,
    host: '45.32.199.116',
  },
}

module.exports = { ...baseConfig, ...prodConfig }
