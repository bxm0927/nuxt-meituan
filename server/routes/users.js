/*
 * 用户相关接口
 * @Author: xiaoming.bai
 * @Date: 2019-08-21 23:55:54
 * @Last Modified by: xiaoming.bai
 * @Last Modified time: 2019-08-23 11:27:13
 */

const Router = require('koa-router')
const usersService = require('../service/users')

const router = new Router({
  prefix: '/users',
})

// 发送邮件验证码
router.post('/verify', usersService.verify())

// 注册
router.post('/signup', usersService.signup())

// 登录
router.post('/signin', usersService.signin())

// 退出
router.post('/exit', usersService.exit())

// 获取个人信息
router.post('/getAccountInfo', usersService.getAccountInfo())

module.exports = router
