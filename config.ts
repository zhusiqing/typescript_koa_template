import path from 'path'

const env:string|undefined = process.env.NODE_ENV
const config = {
  // server
  host: 'localhost',
  port: 3000,
  // api
  proxyPrefix: '/api',
  logs: {
    env,
    logLevel: 'debug',
    dir: path.resolve(__dirname, 'logs')
  },
  redis: {
    host: '127.0.0.1',
    port: 6379,
    db: 0,
    password: ''
  }
}
export const logs = config.logs
export const redis = config.redis
export default config
