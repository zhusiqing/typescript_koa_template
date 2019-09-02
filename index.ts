// import koa from 'koa'
import Application, { Context } from 'koa'
import consola from 'consola'

import middleware from './app/middleware';
import router from './app/router'

import utils from './app/utils'
// 项目初始化后，清除输出到控制台信息
if(utils.isDev) {
  console.clear()
}
const port = 3000

// 拓展koa类
class MyApplication extends Application {
  $logger = utils.logger('app')
  $redis = utils.redis
}
const app:MyApplication = new MyApplication()
middleware(app)

app.use(router.routes()).use(router.allowedMethods())

app.on('error', (err:Error, ctx:Context) => {
  if (ctx) {
    ctx.logger.error(`server error ${JSON.stringify(err)}`)
  } else {
    app.$logger.error(`server error ${JSON.stringify(err)}`)
  }
})

app.listen(port, () => {
  app.$logger.info('server is started ...')
  consola.log('application is running ...')
  if (utils.isDev) {
    const address = utils.getIpAdress()
    consola.ready(`server is started at http://127.0.0.1:${port}`)
    consola.ready(`server is started at http://${address}:${port}\n\n`)
  }
})
