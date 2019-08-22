/*
 * 用户相关接口
 * @Author: xiaoming.bai
 * @Date: 2019-08-21 23:55:54
 * @Last Modified by: xiaoming.bai
 * @Last Modified time: 2019-08-23 01:06:28
 */

const Router = require('koa-router')
const Redis = require('koa-redis')
const nodemailer = require('nodemailer')
const axios = require('../utils/axios')
const passport = require('../utils/passport')
const UserModel = require('../models/users')
const config = require('../../config')

const router = new Router({
  prefix: '/users',
})

const Store = new Redis().client

// 发送邮件验证码
router.post('/verify', async (ctx, next) => {
  const { username, email } = ctx.request.body
  const saveExpire = await Store.hget(`nodemailer:${username}`, 'expire')

  if (saveExpire && new Date().getTime() < saveExpire) {
    ctx.body = { code: -1, data: null, msg: '请求过于频繁，请稍后再试' }
    return
  }

  const { host, port, user, pass } = config.smtp
  const code = config.smtp.code()
  const expire = config.smtp.expire()

  // 开启一个 SMTP 连接池
  const transporter = nodemailer.createTransport({
    secureConnection: true, // use SSL
    secure: true, // secure: true for port 465, secure: false for port 587
    host,
    port,
    auth: { user, pass },
  })

  // 设置邮件内容（谁发送什么给谁）
  const mailOptions = {
    from: `"认证邮件" <${user}>`,
    to: email,
    subject: '《慕课网高仿美团网全栈实战》注册码',
    html: `您在《慕课网高仿美团网全栈实战》课程中注册，您的邀请码是: <strong>${code}</strong>`,
  }

  // 使用先前创建的传输器的 sendMail 方法传递消息对象
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error)
    }
    Store.hmset(`nodemail:${username}`, 'code', code, 'expire', expire, 'email', email)
  })

  ctx.body = { code: 0, data: null, msg: '验证码已发送，可能会有延时，有效期1分钟' }
})

// 注册
router.post('/signup', async (ctx, next) => {
  const { username, password, email, code } = ctx.request.body

  if (!code) {
    ctx.body = { code: -1, data: null, msg: '请填写验证码' }
    return
  }

  const saveCode = await Store.hget(`nodemailer:${username}`, 'code')
  const saveExpire = await Store.hget(`nodemailer:${username}`, 'expire')

  if (code === saveCode) {
    if (new Date().getTime() > saveExpire) {
      ctx.body = { code: -1, data: null, msg: '验证码已过期，请重新获取' }
      return
    }
  } else {
    ctx.body = { code: -1, data: null, msg: '请填写正确的验证码' }
  }

  const user = await UserModel.find({ username })
  if (user.length) {
    ctx.body = { code: -1, data: null, msg: '该用户名已被使用' }
    return
  }

  const newUser = await UserModel.create({ username, email, password })
  if (!newUser) {
    ctx.body = { code: -1, data: null, msg: '注册失败，请重新尝试' }
    return
  }

  const result = await axios.post('/users/signin', { username, password })
  if (result.data && result.data.code === 0) {
    ctx.body = { code: 0, data: result.data.username, msg: '注册成功' }
  } else {
    ctx.body = { code: -1, data: null, msg: '注册成功，自动登录失败，请重新尝试' }
  }
})

// 登录
router.post('/signin', async (ctx, next) => {
  return passport.authenticate('local', (err, user, info, status) => {
    if (err) {
      ctx.body = { code: -1, data: null, msg: err }
      return
    }

    if (!user) {
      ctx.body = { code: -1, data: null, msg: info }
      return
    }

    ctx.body = { code: 0, data: user.username, msg: '登录成功' }
    return ctx.login(user)
  })(ctx, next)
})

// 退出
router.post('/exit', async (ctx, next) => {
  await ctx.logout()

  if (ctx.isAuthenticated()) {
    ctx.body = { code: -1, data: null, msg: '退出失败' }
    return
  }

  ctx.body = { code: 0, data: null, msg: '退出成功' }
})

// 获取个人信息
router.post('/getAccountInfo', async (ctx, next) => {
  // 验证登录态
  if (!ctx.isAuthenticated()) {
    ctx.body = { code: -1, data: null, msg: '您未登录' }
    return
  }

  const {
    user: { username, email },
  } = ctx.session.passport // passport 的信息存储在 session 中

  ctx.body = {
    code: 0,
    data: { username, email },
    msg: '',
  }
  return
})

module.exports = router
