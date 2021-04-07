import mongoose from 'mongoose'
import session from 'express-session'
import connectRedis from 'connect-redis'
import Redis from 'ioredis'
import { MONGO_URI, MONGO_OPTIONS, APP_PORT, REDIS_OPTIONS } from './config'
import { createApp } from './app'

const main = async () => {
  await mongoose.connect(MONGO_URI, MONGO_OPTIONS)

  const RedisStore = connectRedis(session)

  const client = new Redis(REDIS_OPTIONS)

  const store = new RedisStore({ client })

  const app = createApp(store)

  app.listen(APP_PORT, () => console.log(`http://localhost:${APP_PORT}`))
}

main().catch(error => console.error(error))
