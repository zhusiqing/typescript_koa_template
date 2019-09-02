import getIpAdress from './getIpAdress'
import logger, { loggerInterface } from './logger'
import redis, { redisInterface } from './redis'

interface utilsInterface {
  getIpAdress: () => string
  logger: (string) => loggerInterface
  isDev: boolean,
  redis: redisInterface
}

const env = process.env
const isDev = env.NODE_ENV === 'development'

const utils: utilsInterface = {
  getIpAdress,
  logger,
  isDev,
  redis
}

export default utils
