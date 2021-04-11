import express from 'express'
import session, { Store } from 'express-session'
import { SESSION_OPTIONS, STATIC_DIR, FRONTEND_BUILD_DIR, IN_PROD } from './config'
import { home, upload, verify, reset } from './routes' // verify, reset
import { notFound, serverError, active } from './middleware'
import { startPassport } from './passport'

export const createApp = (store: Store) => {
  const app = express()

  app.use(express.static(STATIC_DIR))

  app.use(express.json())

  app.use(session({ ...SESSION_OPTIONS, store }))

  startPassport(app)

  app.use(upload)

  app.use(active)

  app.use(home)

  app.use(verify)

  app.use(reset)

  if (IN_PROD) {
    app.use(express.static(FRONTEND_BUILD_DIR))

    app.get('*', (_, res) => res.sendFile(FRONTEND_BUILD_DIR))
  }

  app.use(notFound)

  app.use(serverError)

  return app
}
