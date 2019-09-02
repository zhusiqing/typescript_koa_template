// import koa from 'koa'
import Application, { Context } from 'koa'
import consola from 'consola'

import middleware from './app/middleware';
import router from './app/router'

import utils from './app/utils'
import { loggerInterface } from './app/utils/logger'
// 项目初始化后，清除输出到控制台信息
if(utils.isDev) {
  console.clear()
}
const port = 3000
// 因为中间打印信息会被清除，所以放到前面

// 拓展koa类
class MyApplication extends Application {
  $logger: loggerInterface = utils.logger('app')
  $redis = utils.redis
}
const app:MyApplication = new MyApplication()

middleware(app)
app.on('error', (err:Error, ctx:Context) => {
  if (ctx) {
    ctx.logger.error(`server error ${JSON.stringify(err)}`)
  } else {
    app.$logger.error(`server error ${JSON.stringify(err)}`)
  }
})
app.use(router.routes()).use(router.allowedMethods())

app.listen(port)
consola.log('application is running ...')

if (utils.isDev) {
  const address = utils.getIpAdress()
  consola.ready(`server is started at http://127.0.0.1:${port}`)
  consola.ready(`server is started at http://${address}:${port}\n\n`)
}
