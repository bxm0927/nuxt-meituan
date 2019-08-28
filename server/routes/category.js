/*
 * 搜索服务相关接口
 * @Author: xiaoming.bai
 * @Date: 2019-08-29 00:05:25
 * @Last Modified by: xiaoming.bai
 * @Last Modified time: 2019-08-29 01:12:09
 */

const Router = require('koa-router')
const categoryService = require('../service/category')

const router = new Router({
  prefix: '/category',
})

// 产品分类列表
router.get('/crumbs', categoryService.crumbs())

module.exports = router
