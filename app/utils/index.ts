import getIpAdress from './getIpAdress'
import logger, { loggerInterface } from './logger'

interface utilsInterface {
  getIpAdress: () => string
  logger: (string) => loggerInterface
  isDev: boolean
}

const env = process.env
const isDev = env.NODE_ENV === 'development'

const utils: utilsInterface = {
  getIpAdress,
  logger,
  isDev
}

export default utils
