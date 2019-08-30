import { Context } from 'koa';
import logger from './logger'
import { MyApplication } from '../../types';
import helmet from 'koa-helmet'

const middleware = (app: MyApplication) => {
  // 挂载请求级别的日志
  app.use((ctx:Context, next) => logger(ctx, next))
  app.use(helmet())
}
export default middleware
