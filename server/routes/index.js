/*
 * 注册路由表
 * @Author: xiaoming.bai
 * @Date: 2019-08-30 23:59:21
 * @Last Modified by:   xiaoming.bai
 * @Last Modified time: 2019-08-30 23:59:21
 */

const userRouter = require('./users')
const geoRouter = require('./geo')
const searchRouter = require('./search')
const categoryRouter = require('./category')
const cartRouter = require('./cart')

module.exports = app => {
  const routes = [
    userRouter,
    geoRouter,
    searchRouter,
    categoryRouter,
    cartRouter,
  ]

  routes.forEach(route => {
    app.use(route.routes(), route.allowedMethods())
  })
}
