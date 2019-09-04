const Koa = require(`koa`)
const Router = require(`koa-router`)
const oauth = require(`./oauth`)
const { jwt } = require(`./middleware/auth`)
const indexRoutes = require(`./constants/indexRoutes`)

const app = new Koa()
const router = new Router()

router.get(`/`, async ctx => {
  ctx.query.pretty = true
  ctx.body = indexRoutes
})

// import and use the OAuth router.
oauth(router)

router.get(`/testauth`, jwt, async ctx => {
  ctx.body = `Authenticated!`
})

router.get(`/ping`, async ctx => {
  ctx.body = `pong!`
  ctx.status = 200
})

router.get(`/echo`, async ctx => {
  ctx.response.body = ctx.request.body
  ctx.status = 200
})

// route not found.
router.get(/.*/, async ctx => {
  ctx.throw(404, `Not found`)
})

app.use(router.routes())
app.use(router.allowedMethods())
module.exports = app
