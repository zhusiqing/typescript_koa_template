import { Context } from 'koa'
class Api {
  index(ctx: Context) {
    ctx.body = '/'
  }
  ip(ctx: Context) {
    const ip = ctx.ip.replace('::ffff:', '')
    ctx.body = `ip: ${ip}`
  }
}
export default Api
