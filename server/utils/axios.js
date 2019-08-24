/*
 * https://github.com/axios/axios
 * @Author: xiaoming.bai
 * @Date: 2019-08-22 17:32:04
 * @Last Modified by: xiaoming.bai
 * @Last Modified time: 2019-08-25 01:22:05
 */

const axios = require('axios')
const config = require('../../config')
const { host, port } = config.server

const instance = axios.create({
  baseURL: `http://${host}:${port}`,
  timeout: 10000,
  headers: {},
})

module.exports = instance
