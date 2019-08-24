/*
 * https://github.com/axios/axios
 * @Author: xiaoming.bai
 * @Date: 2019-08-22 17:32:04
 * @Last Modified by: xiaoming.bai
 * @Last Modified time: 2019-08-24 01:13:33
 */

const axios = require('axios')
const config = require('../../config')
const { host, port } = config.server

const instance = axios.create({
  baseURL: `http://${host}:${port}`,
  timeout: 2000,
  headers: {},
})

module.exports = instance
