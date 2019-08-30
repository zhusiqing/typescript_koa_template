// import koa from 'koa'
import Application, { Context } from 'koa'
import consola from 'consola'

import middleware from './app/middleware';
import router from './app/router'

import utils from './app/utils'
import { loggerInterface } from './app/utils/logger'

// 拓展koa类
class MyApplication extends Application {
  logger: loggerInterface = utils.logger('app')
}
const app:MyApplication = new MyApplication()

middleware(app)
app.on('error', (err:Error, ctx:Context) => {
  if (ctx) {
    ctx.logger.error(`server error ${JSON.stringify(err)}`)
  } else {
    app.logger.error(`server error ${JSON.stringify(err)}`)
  }
})
app.use(router.routes()).use(router.allowedMethods())
const port = 3000
app.listen(port)
const address = utils.getIpAdress()
// 清除输出到控制台信息
console.clear()
consola.log('server is compiled ...')
consola.ready(`server is started at http://127.0.0.1:${port}`)
consola.ready(`server is started at http://${address}:${port}`)
