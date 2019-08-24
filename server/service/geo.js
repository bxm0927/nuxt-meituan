const axios = require('../utils/axios')
const citiesModel = require('../models/cities')
const menusModel = require('../models/menus')
// const provincesModel = require('../models/provinces')

const getPosition = () => {
  return async (ctx, next) => {
    const { status, data } = await axios.get('http://cp-tools.cn/geo/getPosition')

    if (status === 200 && data) {
      ctx.body = { code: 0, data, msg: '' }
    } else {
      ctx.body = { code: -1, data: null, msg: '接口出错' }
    }
  }
}

const province = () => {
  return async (ctx, next) => {
    // const provinces = await provincesModel.find() // 本地数据不完整
    const {
      status,
      data: { province },
    } = await axios.get('http://cp-tools.cn/geo/province')

    if (status === 200 && province && province.length) {
      const data = province.map(item => {
        return {
          id: item.id,
          value: item.name,
        }
      })

      ctx.body = { code: 0, data, msg: '' }
    } else {
      ctx.body = { code: -1, data: null, msg: '接口出错' }
    }
  }
}

const getCitysByProvinceId = () => {
  return async (ctx, next) => {
    const { id } = ctx.params
    // const citys = await citiesModel.findOne({ id })
    const {
      status,
      data: { city },
    } = await axios.get(`http://cp-tools.cn/geo/province/${id}`)

    if (status === 200) {
      ctx.body = { code: 0, data: city, msg: '' }
    } else {
      ctx.body = { code: -1, data: null, msg: '接口出错' }
    }
  }
}

const city = () => {
  return async (ctx, next) => {
    const {
      status,
      data: { city },
    } = await axios.get('http://cp-tools.cn/geo/city')

    if (status === 200) {
      ctx.body = { code: 0, data: city, msg: '' }
    } else {
      ctx.body = { code: -1, data: null, msg: '接口出错' }
    }

    // const result = await citiesModel.find()

    // if (!result) {
    //   ctx.body = { code: -1, data: null, msg: '接口出错' }
    // }

    // const cities = result.map(province => {
    //   return province.value.map(city => {
    //     return {
    //       provinceId: province.id,
    //       id: city.id,
    //       province: city.province,
    //       name: ['市辖区', '省直辖县级行政区划'].includes(city.name) ? city.province : city.name,
    //     }
    //   })[0]
    // })

    // ctx.body = { code: 0, data: cities, msg: '' }
  }
}

const hotCity = () => {
  return async (ctx, next) => {
    const {
      status,
      data: { hots },
    } = await axios.get('http://cp-tools.cn/geo/hotCity')

    if (status === 200) {
      ctx.body = { code: 0, data: hots, msg: '' }
    } else {
      ctx.body = { code: -1, data: null, msg: '接口出错' }
    }

    // const hotCitylist = [
    //   '北京市',
    //   '上海市',
    //   '广州市',
    //   '深圳市',
    //   '天津市',
    //   '西安市',
    //   '杭州市',
    //   '南京市',
    //   '武汉市',
    //   '成都市',
    // ]

    // let newList = []
    // const result = await citiesModel.find()

    // if (!result) {
    //   ctx.body = { code: -1, data: null, msg: '接口出错' }
    // }

    // result.forEach(item => {
    //   const filterList = item.value.filter(city => {
    //     return hotCitylist.includes(city.name) || hotCitylist.includes(city.province)
    //   })
    //   newList = newList.concat(filterList)
    // })

    // ctx.body = { code: 0, data: newList, msg: '' }
  }
}

const menu = () => {
  return async (ctx, next) => {
    const {
      status,
      data: { menu },
    } = await axios.get('http://cp-tools.cn/geo/menu')

    if (status === 200) {
      ctx.body = { code: 0, data: menu, msg: '' }
    } else {
      ctx.body = { code: -1, data: null, msg: '接口出错' }
    }

    // const menus = await menusModel.findOne()

    // if (menus) {
    //   ctx.body = { code: 0, data: menus.menu, msg: '' }
    // } else {
    //   ctx.body = { code: -1, data: null, msg: '接口出错' }
    // }
  }
}

module.exports = {
  getPosition,
  province,
  getCitysByProvinceId,
  city,
  hotCity,
  menu,
}
