const userRouter = require('./users')
const geoRouter = require('./geo')
const searchRouter = require('./search')
const categoryRouter = require('./category')

module.exports = app => {
  app.use(userRouter.routes(), userRouter.allowedMethods())
  app.use(geoRouter.routes(), geoRouter.allowedMethods())
  app.use(searchRouter.routes(), searchRouter.allowedMethods())
  app.use(categoryRouter.routes(), categoryRouter.allowedMethods())
}
