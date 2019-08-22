/*
 * Development Environment Configuration
 * @Author: xiaoming.bai
 * @Date: 2019-08-11 12:08:27
 * @Last Modified by: xiaoming.bai
 * @Last Modified time: 2019-08-22 21:44:19
 */

module.exports = {
  mode: 'development',
  server: {
    port: 3000,
    host: 'localhost',
  },

  // MongoDB
  dbs: 'mongodb://127.0.0.1:27017/meituan',

  // Redis
  redis: {
    get host() {
      return '127.0.0.1'
    },
    get port() {
      return '6379'
    },
  },

  // SMTP
  smtp: {
    get host() {
      return 'smtp.qq.com'
    },
    get port() {
      return 465
    },
    get user() {
      return '80583600@qq.com'
    },
    // 授权码
    get pass() {
      return 'ptgrrixivkjccajc'
    },
    // 验证码
    get code() {
      return () => {
        return Math.random()
          .toString(16)
          .slice(2, 6)
          .toUpperCase()
      }
    },
    // 过期时间
    get expire() {
      return () => {
        return new Date().getTime() + 1000 * 60 // 1 分钟
      }
    },
  },
}
