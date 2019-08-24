const axios = require('../utils/axios')
const poisModel = require('../models/pois')

const top = () => {
  return async (ctx, next) => {
    const { input, city } = ctx.query
    const {
      status,
      data: { top },
    } = await axios.get('http://cp-tools.cn/search/top', {
      params: { input, city },
    })

    if (status === 200) {
      ctx.body = { code: 0, data: top, msg: '' }
    } else {
      ctx.body = { code: 0, data: null, msg: '' }
    }
  }
}

const resultsByKeywords = () => {
  return async (ctx, next) => {
    const { city, keyword } = ctx.query
    const { status, data } = await axios.get('http://cp-tools.cn/search/resultsByKeywords', {
      params: { city, keyword },
    })

    if (status === 200) {
      ctx.body = { code: 0, data, msg: '' }
    } else {
      ctx.body = { code: 0, data: null, msg: '' }
    }
  }
}

const hotplace = () => {
  return async (ctx, next) => {
    const { city } = ctx.query
    const {
      status,
      data: { result },
    } = await axios.get('http://cp-tools.cn/search/hotplace', {
      params: { city },
    })

    if (status === 200) {
      ctx.body = { code: 0, data: result, msg: '' }
    } else {
      ctx.body = { code: 0, data: null, msg: '' }
    }
  }
}

const products = () => {
  return async (ctx, next) => {}
}

const getProductDetail = () => {
  return async (ctx, next) => {}
}

module.exports = {
  top,
  resultsByKeywords,
  hotplace,
  products,
  getProductDetail,
}
