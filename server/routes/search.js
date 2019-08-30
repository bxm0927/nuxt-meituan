/*
 * 搜索服务相关接口
 * @Author: xiaoming.bai
 * @Date: 2019-08-21 23:55:54
 * @Last Modified by: xiaoming.bai
 * @Last Modified time: 2019-08-30 23:51:14
 */

const Router = require('koa-router')
const searchService = require('../service/search')

const router = new Router({
  prefix: '/search',
})

// 根据搜索关键字实时推荐
router.get('/top', searchService.top())

// 根据关键词搜索
router.get('/resultsByKeywords', searchService.resultsByKeywords())

// 热门搜索
router.get('/hotplace', searchService.hotplace())

// 产品列表
router.get('/products', searchService.products())

module.exports = router
