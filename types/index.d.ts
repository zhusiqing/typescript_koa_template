import 'koa'

import Application from 'koa'
import { loggerInterface } from '../app/utils/logger'
import { redisInterface } from '../app/utils/redis'

declare class MyApplication extends Application {
  $logger: loggerInterface
  $redis: redisInterface
}
declare module 'koa' {

  export interface Application {
    $logger: loggerInterface
    $redis: redisInterface
  }
  interface Context {
    $logger?: loggerInterface
  }
}
