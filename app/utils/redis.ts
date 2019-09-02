import ioredis, { Redis } from 'ioredis'

const redis = new ioredis()

export class redisInterface extends ioredis implements Redis {

}

export default redis
