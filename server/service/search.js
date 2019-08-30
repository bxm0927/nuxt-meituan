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
      ctx.body = { code: -1, data: null, msg: '' }
    }

    // try {
    //   let top = await poisModel.find({
    //     name: new RegExp(input),
    //     city: city,
    //   })

    //   ctx.body = {
    //     code: 0,
    //     top: top.map(item => {
    //       return {
    //         name: item.name,
    //         type: item.type,
    //       }
    //     }),
    //     type: top.length ? top[0].type : '',
    //   }
    // } catch (e) {
    //   ctx.body = {
    //     code: -1,
    //     top: [],
    //   }
    // }
  }
}

const resultsByKeywords = () => {
  return async (ctx, next) => {
    const { city, keyword } = ctx.query
    const api = 'http://cp-tools.cn/search/resultsByKeywords'
    const { status, data } = await axios.get(api, {
      params: { city, keyword },
    })

    if (status === 200) {
      ctx.body = { code: 0, data, msg: '' }
    } else {
      ctx.body = { code: -1, data: null, msg: '' }
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
      ctx.body = { code: -1, data: null, msg: '' }
    }

    // try {
    //   let result = await poisModel.find({ city }).limit(10)

    //   ctx.body = {
    //     code: 0,
    //     result: result.map(item => {
    //       return {
    //         name: item.name,
    //         type: item.type,
    //       }
    //     }),
    //   }
    // } catch (e) {
    //   ctx.body = {
    //     code: -1,
    //     result: [],
    //   }
    // }
  }
}

const products = () => {
  return async (ctx, next) => {
    const { keyword, type, city } = ctx.query
    const {
      status,
      data: { product, more },
    } = await axios.get('http://cp-tools.cn/search/products', {
      params: { keyword, type, city },
    })

    if (status === 200) {
      ctx.body = {
        code: 0,
        data: {
          product,
          more: ctx.isAuthenticated() ? more : [],
          login: ctx.isAuthenticated(),
        },
        msg: '',
      }
    } else {
      ctx.body = {
        code: -1,
        data: {
          product: {},
          more: ctx.isAuthenticated() ? more : [],
          login: ctx.isAuthenticated(),
        },
        msg: '',
      }
    }
  }
}

module.exports = {
  top,
  resultsByKeywords,
  hotplace,
  products,
}
