import getIpAdress from './getIpAdress'
import logger from './logger'
import redis, { redisInterface } from './redis'

interface utilsInterface {
  getIpAdress: () => string
  logger: typeof logger
  isDev: boolean,
  redis: redisInterface,
  getIp: (ip: string) => string
}

// isDev
const env = process.env
const isDev = env.NODE_ENV === 'development'

// getIp
const getIp = (ip: string) => ip.replace('::ffff:', '')

const utils: utilsInterface = {
  getIpAdress,
  logger,
  isDev,
  redis,
  getIp
}

export default utils
