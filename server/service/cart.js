const CryptoJS = require('crypto-js')
const Cart = require('../models/cart')

const create = () => {
  return async (ctx, next) => {
    if (!ctx.isAuthenticated()) {
      ctx.body = { code: -1, data: null, msg: '您未登录' }
      return
    }

    const { id, detail } = ctx.request.body
    const time = Date()
    const cartNo = CryptoJS.MD5(Math.random() * 1000 + time).toString()
    const cart = new Cart({
      id,
      detail,
      cartNo,
      time,
      user: ctx.session.passport.user,
    })

    const result = await cart.save()

    if (result) {
      ctx.body = { code: 0, data: cartNo, msg: '' }
    } else {
      ctx.body = { code: -1, data: null, msg: '' }
    }
  }
}

const getCart = () => {
  return async (ctx, next) => {
    const { id } = ctx.request.body
    const result = await Cart.findOne({ cartNo: id })

    if (result) {
      ctx.body = { code: 0, data: result.detail[0], msg: '' }
    } else {
      ctx.body = { code: -1, data: null, msg: '' }
    }
  }
}

module.exports = {
  create,
  getCart,
}
