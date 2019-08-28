const axios = require('../utils/axios')
const categoryModel = require('../models/category')

const crumbs = () => {
  return async (ctx, next) => {
    const { city } = ctx.query
    const api = 'http://cp-tools.cn/categroy/crumbs'
    const { status, data } = await axios.get(api, {
      params: { city },
    })

    if (status === 200 && data) {
      ctx.body = { code: 0, data, msg: '' }
    } else {
      ctx.body = { code: -1, data: null, msg: '接口出错' }
    }

    // // ??? 没有返回值
    // const data = await categoryModel.findOne({ city })
    // ctx.body = { code: 0, data, msg: '' }
  }
}

module.exports = {
  crumbs,
}
