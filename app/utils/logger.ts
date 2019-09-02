import { configure, getLogger } from 'log4js'
import path from 'path'

import { logs as logConfig } from '../../config'

// 默认配置
const defaultConfig = {
  logLevel: 'debug', // 日志级别
  dir: path.resolve(__dirname, '../../logs'), // 指定日志存放目录名
  env: 'dev', // 指定当前环境，当开发时控制台也输出
  serverIp: '127.0.0.1'
}

function loggerBuilder (source: 'app'|'ctx'|'error' = 'app') {
  const opt = Object.assign({}, defaultConfig, logConfig)

  const { env, logLevel, dir, serverIp } = opt

  /**
   * 记录日志的方式
   * 指定要记录的日志分类 log
   * 展示方式为文件类型 dateFile
   * 日志输出的文件名 s-yyyy-MM-dd.log
   */
  interface appendersInterface {
    [index:string]: any,
    dev?: any
  }
  const appenders:appendersInterface = {
    ctx: {
      // 按日期进行输出log
      type: 'dateFile',
      // 路径和文件名
      filename: `${dir}/ctx`,
      pattern: '-yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      serverIp,
      // 日志输出格式
      layout: {
        type: 'pattern',
        pattern: '[%d{yyyy-MM-dd hh:mm:ss}] [%p] %c %m%n'
      }
    },
    app: {
      // 按日期进行输出log
      type: 'dateFile',
      // 路径和文件名
      filename: `${dir}/app`,
      pattern: '-yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      serverIp,
      // 日志输出格式
      layout: {
        type: 'pattern',
        pattern: '[%d{yyyy-MM-dd hh:mm:ss}] [%p] %c %m%n'
      }
    },
    error: {
      // 按日期进行输出log
      type: 'dateFile',
      // 路径和文件名
      filename: `${dir}/${source}-error`,
      pattern: '-yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      serverIp,
      // 日志输出格式
      layout: {
        type: 'pattern',
        pattern: '[%d{yyyy-MM-dd hh:mm:ss}] [%p] %c %m%n'
      }
    }
  }
  const isDev = env === 'dev' || env === 'local' || env === 'development'

  // 开发和本地同时启用console
  if (isDev) {
    appenders.dev = {
      type: 'console',
      layout: {
        type: 'pattern',
        pattern: `[%d{yyyy-MM-dd hh:mm:ss}] [%p] %c %m%n`
      }
    }
  }

  /**
   * 指定日志的默认配置项
   * 如果 log4js.getLogger 中没有指定，默认为 appenders中的日志配置项, 数组
   * 指定日志的记录内容显示 某级别 及 某级别 以上级别的信息
   */
  const categories = {
    default: {
      appenders: Object.keys(appenders).filter(key => (key === 'app') || (key === 'dev') ),
      level: logLevel
    },
    app: {
      appenders: Object.keys(appenders).filter(key => (key === 'app') || (key === 'dev') ),
      level: logLevel
    },
    ctx: {
      appenders: Object.keys(appenders).filter(key => (key === 'ctx') || (key === 'dev') ),
      level: logLevel
    },
    error: {
      appenders: Object.keys(appenders).filter(key => (key === 'error') || (key === 'dev') ),
      level: logLevel
    }
  }

  // log4js配置
  configure({
    appenders,
    categories,
    // pm2: !isDev,
    // pm2InstanceVar: 'INSTANCE_ID'
    disableClustering: true
  })

  // 初始化log4js
  const log: {[index:string]: any} = getLogger(source)
  const errorLog: {[index:string]: any} = getLogger('error')
  errorLog

  const logger:loggerInterface = {
    trace: (message:string) => log['trace'](message),
    debug: (message:string) => log['debug'](message),
    info: (message:string) => log['info'](message),
    warn: (message:string) => log['warn'](message),
    error: (message:string) => {
      errorLog['error'](message)
      return log['error'](message)
    },
    fatal: (message:string) => log['fatal'](message),
    mark: (message:string) => log['mark'](message)
  }
  return logger
}
// 日志级别
// const methods:Array<string> = ['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'mark']

export interface loggerInterface {
  trace: (message:string) => string,
  debug: (message:string) => string,
  info: (message:string) => string,
  warn: (message:string) => string,
  error: (message:string) => string,
  fatal: (message:string) => string,
  mark: (message:string) => string,
}
export default loggerBuilder
