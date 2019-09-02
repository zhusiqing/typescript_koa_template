/**
 * @name utils/redis
 * @description redis 连接和配置
 */
import ioredis, { Redis } from 'ioredis'
import { redis as redisConfig } from '../../config'

const redis: Redis = new ioredis({
  host: redisConfig.host,
  port: redisConfig.port,
  db: redisConfig.db,
  password: redisConfig.password
})

export class redisInterface extends ioredis implements Redis {

}

export default redis
