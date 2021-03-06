/**
 * @name middleware/logger
 * @description 请求级别的log日志挂载和处理
 */
import { Context } from 'koa';
import logger from '../utils/logger'

export default async(ctx: Context, next) => {
  ctx.$logger = logger('ctx')
  const isApi: boolean = /^\/api/.test(ctx.url)
  if (isApi) {
    const { url, header, method, querystring } = ctx.request
    const ip = ctx.ip.replace('::ffff:', '')
    ctx.$logger.info(`【request】[${method}] ${url} ${querystring} ip:${ip} header:${JSON.stringify(header)}`)
  }
  await next()

  if (isApi) {
    const { status, header, message, body } = ctx.response
    const bodyText = JSON.stringify(body)
    if (ctx.status >= 200 && ctx.status < 400 ) {
      ctx.$logger.info(`【response】${status} message:${message} header:${JSON.stringify(header)}
${bodyText}`)
    } else {
      ctx.$logger.error(`【response】${status} message:${message} header:${JSON.stringify(header)}
      ${bodyText}`)
    }

  }
}
