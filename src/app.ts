import express from 'express'
import session, { Store } from 'express-session'
import { SESSION_OPTIONS, STATIC_DIR } from './config'
import { home, upload, verify, reset } from './routes' // verify, reset
import { notFound, serverError, active } from './middleware'
import { startPassport } from './passport'
require('dotenv').config()

export const createApp = (store: Store) => {
  const app = express()

  app.use(express.static(STATIC_DIR))

  app.use(express.json())

  app.use(session({ ...SESSION_OPTIONS, store }))

  startPassport(app)

  app.use(upload)

  // app.use(active) Let's make req.user be an object { userId, createdAt} So we can expire it after 3-5 days of inactivity

  app.use(home)

  app.use(verify)

  app.use(reset)

  app.use(notFound)

  app.use(serverError)

  return app
}
