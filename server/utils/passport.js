/*
 * 鉴权
 * https://github.com/rkusa/koa-passport
 * https://github.com/jaredhanson/passport-local
 * @Author: xiaoming.bai
 * @Date: 2019-08-21 23:53:49
 * @Last Modified by: xiaoming.bai
 * @Last Modified time: 2019-08-22 19:03:50
 */

const passport = require('koa-passport')
const LocalStrategy = require('passport-local')
const UserModel = require('../models/users')

// 用户名和密码身份验证策略
const localStrategy = new LocalStrategy(async (username, password, done) => {
  const where = { username }
  const result = await UserModel.findOne(where)

  if (result != null) {
    if (result.password === password) {
      return done(null, result)
    } else {
      return done(null, false, '密码错误')
    }
  } else {
    return done(null, false, '用户不存在')
  }
})

passport.use(localStrategy)

// 序列化
passport.serializeUser((user, done) => {
  done(null, user)
})

// 反序列化
passport.deserializeUser((user, done) => {
  return done(null, user)
})

module.exports = passport
