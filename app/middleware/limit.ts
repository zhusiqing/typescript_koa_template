/**
 * @name middleware/limit
 * @description 接口限流处理
 */

import { Context } from 'koa'
import utils from '../utils'
import { apiLimit } from '../../config'
export default async (ctx: Context, next) => {
  // 非api过滤
  if (!/^\/api/.test(ctx.url)) {
    next()
    return false
  }
  const ip = utils.getIp(ctx.ip)
  // 在规定时间内是否存在该ip
  let hasIp = await ctx.app.$redis.get(ip)
  // 获取该ip限制的过期时间
  let ExIp = await ctx.app.$redis.get(`${ip}EX`)
  // 不存在过期时间则初始化
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
