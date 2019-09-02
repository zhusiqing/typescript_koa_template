import Application, { Context } from 'koa'
import { loggerInterface } from '../app/utils/logger'
import { redisInterface } from '../app/utils/redis'
declare class MyApplication extends Application {
  $logger: loggerInterface
  $redis: redisInterface
}

declare module 'koa' {
  interface Context {
    $logger: loggerInterface
  }
}

