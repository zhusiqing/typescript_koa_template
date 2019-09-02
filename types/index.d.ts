import Application from 'koa'
import { loggerInterface } from '../app/utils/logger'
import { redisInterface } from '../app/utils/redis'
// 因为koa的Application是class，不能进行扩展
// 创建实例app用的
declare class MyApplication extends Application {
  $logger: loggerInterface
  $redis: redisInterface
}
declare module 'koa' {
  // ctx.app的声明扩展
  export interface Application {
    $logger: loggerInterface
    $redis: redisInterface
  }
  interface Context {
    $logger?: loggerInterface
  }
}
