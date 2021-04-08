import passport from 'passport'
import { Express, Request } from 'express'
import { IUser, User } from './models'
import { APP_ORIGIN } from './config'
import { catchAsync, guest } from './middleware'
import {
  createGithubPassport,
  createGooglePassport,
  createLocalPassport,
} from './routes/auth/index'

export const startPassport = (app: Express) => {
  passport.serializeUser((userId: Express.User, done) => done(null, userId))
  passport.deserializeUser((userId: Express.User, done) => done(null, userId))

  app.use(passport.initialize())
  app.use(passport.session())

  createGooglePassport(app)
  createGithubPassport(app)
  createLocalPassport(app)
}

type StrategyConfig =
  | {
      clientID: string
      clientSecret: string
      scope?: string | string[]
    }
  | {}

export type GetUserInformationFunction = (
  profile: any
) =>
  | Omit<Omit<IUser, '_id'>, 'authMethod'>
  | Promise<Omit<Omit<IUser, '_id'>, 'authMethod'>>

export type LocalVerifyFunction = (
  req: Request,
  username: string,
  password: string,
  done: (error: any, user?: any, msg?: { message?: string }) => void
) => void

export type VerifyFunction = (
  profile: any,
  done: (error: any, user?: any, msg?: { message?: string }) => void
) => void

const defaultVerifyFunction = async (
  profile: any,
  done: (error: any, user?: any) => void
) => {
  const { email, name, password, avatar } = {
    name: profile.displayName || '',
    avatar: profile.photos[0].value,
    email: profile.email || profile.emails[0].value,
    password: 'asd',
  }
  try {
    let user = await User.findOne({ email })

    if (!user) {
      user = await User.create({
        email,
        name,
        avatar,
        password,
        authMethod: 'oauth',
      })
    }

    done(null, user.id)
  } catch (e) {
    done(e)
  }
}

export const createPassport = (
  app: Express,
  service: string,
  Strategy: new (...args: any) => passport.Strategy,
  strategyConfig: StrategyConfig,
  { preRequest = (_req: Request) => {}, postRequest = (_req: Request) => {} } = {},
  verify: LocalVerifyFunction | VerifyFunction = defaultVerifyFunction
) => {
  passport.use(
    new Strategy(
      {
        ...strategyConfig,
        callbackURL: `${APP_ORIGIN}/auth/${service}/callback`,
      },
      verify
    )
  )

  app.get(
    `/auth/${service}/`,
    guest,
    catchAsync(async (req, res, next) => {
      if (preRequest) {
        await preRequest(req)
      }
      passport.authenticate(service, {
        session: true,
        successRedirect: '/home',
        passReqToCallback: true,
      })(req, res, next)
    })
  )

  app.get(
    `/auth/${service}/callback`,
    passport.authenticate(service, {
      session: true,
      successRedirect: '/home',
      passReqToCallback: true,
    }),
    catchAsync(async (req, res, next) => {
      if (postRequest) {
        await postRequest(req)
      }
      res.json(req.user)
      next()
    })
  )
}
