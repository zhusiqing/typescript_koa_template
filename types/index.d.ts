import Application, { Context } from 'koa'
import { loggerInterface } from '../app/utils/logger'
declare class MyApplication extends Application {
  logger: loggerInterface
}
