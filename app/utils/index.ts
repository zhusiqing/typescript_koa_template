import getIpAdress from './getIpAdress'
import logger, { loggerInterface } from './logger'

interface utilsInterface {
  getIpAdress: () => string
  logger: (string) => loggerInterface
}

const utils: utilsInterface = {
  getIpAdress,
  logger
}

export default utils
