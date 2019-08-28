/*
 * Nuxt Configuration File
 * @Author: xiaoming.bai
 * @Date: 2019-08-10 16:04:54
 * @Last Modified by: xiaoming.bai
 * @Last Modified time: 2019-08-27 21:14:43
 */

const config = require('./config')
const {
  mode,
  server: { host, port },
} = config

module.exports = {
  mode: 'universal',
  // modern: mode === 'production' ? false : 'client',
  server: { host, port },

  /*
   * Headers of the page
   * vue-meta Doc: https://github.com/nuxt/vue-meta
   */
  head: {
    htmlAttrs: { lang: 'zh' },
    title: '美团网',
    meta: [
      // Renderer
      { charset: 'utf-8' },
      { name: 'renderer', content: 'webkit' },
      { name: 'force-rendering', content: 'webkit' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge,chrome=1' },
      { name: 'theme-color', content: '#13d1be' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },

      // SEO
      { name: 'author', content: 'xiaoming.bai' },
      { hid: 'keywords', name: 'keywords', content: 'HTML,CSS,JS,Vue,Nuxt.js' },
      { hid: 'description', name: 'description', content: '高仿美团网 PC 网页版' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#ff0000' },

  /*
   ** Global CSS
   */
  css: [
    'element-ui/lib/theme-chalk/reset.css',
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/stylesheets/main.css',
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@/plugins/element-ui'],

  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
  ],

  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: `http://${host}:${port}`,
  },

  /*
   ** Build configuration
   */
  build: {
    extractCSS: mode === 'production',
    transpile: [/^element-ui/],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        })
      }
    },
  },
}
