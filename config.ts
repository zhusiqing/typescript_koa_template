import path from 'path'

const env:string|undefined = process.env.NODE_ENV
const config = {
  host: 'localhost',
  port: 3000,
  proxyPrefix: '/api',
  logs: {
    env,
    logLevel: 'debug',
    dir: path.resolve(__dirname, 'logs')
  }
}
export default config
