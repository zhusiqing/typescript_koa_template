// import { Context } from 'koa';
import path from 'path'
import helmet from 'koa-helmet'
import koaStatic from 'koa-static'
import { MyApplication } from '../../types';
import logger from './logger'
import limit from './limit'

const middleware = (app: MyApplication) => {
  app.use(koaStatic(path.join(__dirname, '../../public')))
  // 挂载请求级别的日志
  app.use(logger)
  app.use(helmet())
  app.use(limit)

}
export default middleware
