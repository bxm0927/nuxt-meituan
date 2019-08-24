/*
 * 城市服务相关接口
 * @Author: xiaoming.bai
 * @Date: 2019-08-21 23:55:54
 * @Last Modified by: xiaoming.bai
 * @Last Modified time: 2019-08-24 23:11:56
 */

const Router = require('koa-router')
const geoService = require('../service/geo')

const router = new Router({
  prefix: '/geo',
})

// 根据 IP 获取定位
router.get('/getPosition', geoService.getPosition())

// 查询所有省
router.get('/province', geoService.province())

// 根据省份 id 查城市
router.get('/province/:id', geoService.getCitysByProvinceId())

// 查询所有城市
router.get('/city', geoService.city())

// 查询热门城市
router.get('/hotCity', geoService.hotCity())

// 获取导航菜单
router.get('/menu', geoService.menu())

module.exports = router
