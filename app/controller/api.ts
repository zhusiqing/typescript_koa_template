/**
 * @name controller/api
 * @description /api的请求路由处理
 */

import { Context } from 'koa'
class Api {
  index(ctx: Context) {
    ctx.body = '/'
  }
  ip(ctx: Context) {
    const ip = ctx.ip.replace('::ffff:', '')
    ctx.body = `your ip: ${ip}`
  }
}
export default Api
