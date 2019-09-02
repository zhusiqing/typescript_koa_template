import { Context } from 'koa'
import utils from '../utils'
import { apiLimit } from '../../config'
export default async (ctx: Context, next) => {
  if (!/^\/api/.test(ctx.url)) {
    return false
  }
  const ip = utils.getIp(ctx.ip)
  let hasIp = await ctx.app.$redis.get(ip)
  let ExIp = await ctx.app.$redis.get(`${ip}EX`)
  if (!ExIp) {
    ctx.app.$redis.set(ip, 1, 'EX', apiLimit.time)
    ctx.app.$redis.set(`${ip}EX`, ip, 'EX', apiLimit.time)
    await next()
  } else {
    const count = Number(hasIp) + 1
    if (count > apiLimit.frequency) {
      ctx.status = 403
      ctx.body = '访问受限，访问次数和频率过高'
    } else {
      ctx.app.$redis.set(ip, count, 'EX', apiLimit.time)
      await next()
    }
  }
}
