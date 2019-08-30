/*
 * 购物车相关接口
 * @Author: xiaoming.bai
 * @Date: 2019-08-30 23:34:06
 * @Last Modified by: xiaoming.bai
 * @Last Modified time: 2019-08-30 23:52:02
 */

const Router = require('koa-router')
const cartService = require('../service/cart')

const router = new Router({
  prefix: '/cart',
})

// 创建一个购物车
router.post('/create', cartService.create())

// 获取一个购物车
router.post('/getCart', cartService.getCart())

module.exports = router
