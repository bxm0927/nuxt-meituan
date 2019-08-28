/*
 * Server-side Entry File
 * @Author: xiaoming.bai
 * @Date: 2019-08-10 16:07:14
 * @Last Modified by: xiaoming.bai
 * @Last Modified time: 2019-08-29 00:53:04
 */

const Koa = require('koa')
const json = require('koa-json')
const consola = require('consola')
const Redis = require('koa-redis')
const mongoose = require('mongoose')
const { Nuxt, Builder } = require('nuxt')
const bodyParser = require('koa-bodyparser')
const session = require('koa-generic-session')

const config = require('../config')
const passport = require('./utils/passport')

const app = new Koa()

// Connect MongoDB
mongoose.connect(config.dbs, {
  useNewUrlParser: true,
  useCreateIndex: true,
})

// Middlewares
app.keys = ['meituan', 'keyskeys']
app.proxy = true
app.use(session({ key: 'meituan', prefix: 'meituan:uid', store: new Redis() })) // Sessions
app.use(bodyParser({ extendTypes: ['json', 'form', 'text'] }))
app.use(json())
app.use(passport.initialize())
app.use(passport.session())

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const end = new Date()
  const duration = end - start
  console.log(`${end.toLocaleDateString()} ${end.toLocaleTimeString()} [${duration}ms] ${ctx.method} ${ctx.url}`)
})

// Import and Set Nuxt.js options
const nuxtConfig = require('../nuxt.config.js')
nuxtConfig.dev = app.env !== 'production'

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(nuxtConfig)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000,
  } = nuxt.options.server

  // Build in development
  if (nuxtConfig.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Routes
  require('./routes')(app)

  app.use(ctx => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true,
  })
}

start()
