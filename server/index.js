/*
 * Server-side Entry File
 * @Author: xiaoming.bai
 * @Date: 2019-08-10 16:07:14
 * @Last Modified by: xiaoming.bai
 * @Last Modified time: 2019-08-11 12:17:01
 */

const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')

const app = new Koa()

// Import and Set Nuxt.js options
const nuxtConfig = require('../nuxt.config.js')
nuxtConfig.dev = app.env !== 'production'

async function start () {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(nuxtConfig)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build in development
  if (nuxtConfig.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
