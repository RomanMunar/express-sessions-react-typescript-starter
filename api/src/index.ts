import mongoose from 'mongoose'
import session from 'express-session'
import connectRedis from 'connect-redis'
import Redis from 'ioredis'
import { APP_ORIGIN, MONGO_URI, MONGO_OPTIONS, APP_PORT, REDIS_OPTIONS } from './config'
import { createApp } from './app'
import chalk from 'chalk'
const main = async () => {
  await mongoose.connect(MONGO_URI, MONGO_OPTIONS)

  const RedisStore = connectRedis(session)

  const client = new Redis(REDIS_OPTIONS)

  const store = new RedisStore({ client })

  const app = createApp(store)

  app.listen(APP_PORT, () =>
    console.log(
      chalk.green(`
  +========================================+
  |                                        |
  |  Server Ready at ${APP_ORIGIN} |
  |                                        |
  +========================================+`)
    )
  )
}

main().catch(error => console.error(error))
