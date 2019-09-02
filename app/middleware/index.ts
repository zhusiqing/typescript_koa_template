/**
 * @name middleware
 * @description 中间件聚合层
 */
import path from 'path'
import helmet from 'koa-helmet'
import koaStatic from 'koa-static'
import { MyApplication } from '../../types';
import logger from './logger'
import limit from './limit'

const middleware = (app: MyApplication) => {
  // 增加安全级别
  app.use(helmet())
  // 静态文件处理
  app.use(koaStatic(path.join(__dirname, '../../public')))
  // 挂载请求级别的日志
  app.use(logger)
  // 请求限流
  app.use(limit)

}
export default middleware
