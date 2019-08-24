/*
 * Development Environment Configuration
 * @Author: xiaoming.bai
 * @Date: 2019-08-11 12:08:27
 * @Last Modified by: xiaoming.bai
 * @Last Modified time: 2019-08-24 12:00:22
 */

const baseConfig = require('./base.config')
const devConfig = {
  mode: 'development',
  server: {
    port: 3000,
    host: 'localhost',
  },
}

module.exports = { ...baseConfig, ...devConfig }
