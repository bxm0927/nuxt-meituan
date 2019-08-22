/*
 * https://github.com/axios/axios
 * @Author: xiaoming.bai
 * @Date: 2019-08-22 17:32:04
 * @Last Modified by: xiaoming.bai
 * @Last Modified time: 2019-08-22 18:10:15
 */

const axios = require('axios')
const config = require('../../config')

const instance = axios.create({
  baseURL: `http://${config.server.host || 'localhost'}:${config.server.port || 3000}`,
  timeout: 2000,
  headers: {},
})

module.exports = instance
