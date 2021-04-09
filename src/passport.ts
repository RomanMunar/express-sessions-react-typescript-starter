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
  done: (error: any, user?: Express.User, msg?: { message?: string }) => void
) => void

export type VerifyFunction = (
  _: Request, // req
  __: string, // access_token
  ___: string, // refresh_token
  profile: any,
  done: (error: any, user?: Express.User, msg?: { message?: string }) => void
) => void

const defaultVerifyFunction = async (
  _: Request,
  __: string,
  ___: string,
  profile: any,
  done: (error: any, user?: Express.User) => void
) => {
  const { email, name, avatar } = {
    name: profile.displayName || '',
    avatar: profile.photos[0].value,
    email: profile.email || profile.emails[0].value,
  }
  try {
    let user = await User.findOne({ email })

    if (!user) {
      user = await User.create({
        email,
        name,
        avatar,
        authMethod: 'oauth',
        verifiedAt: new Date(), // oauth accounts don't need to be verified
      })
    }

    done(null, { userId: user.id, sessionCreatedAt: Date.now() })
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
    catchAsync(async (req, _, next) => {
      if (postRequest) {
        await postRequest(req)
      }
      next()
    })
  )
}
