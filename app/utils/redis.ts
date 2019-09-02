import ioredis, { Redis } from 'ioredis'
import { redis as redisConfig } from '../../config'

const redis = new ioredis({
  host: redisConfig.host,
  port: redisConfig.port,
  db: redisConfig.db,
  password: redisConfig.password
})

export class redisInterface extends ioredis implements Redis {

}

export default redis
