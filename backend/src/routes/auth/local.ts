import { LocalVerifyFunction } from '../../passport'
import { Express } from 'express'
import { Strategy as LocalStrategy } from 'passport-local'
import passport from 'passport'
import { User } from '../../models'
import { BadRequest } from '../../errors'
import { auth, catchAsync, guest } from '../../middleware'
import { loginSchema, registerSchema, validate } from '../../validation'
import { logOut } from '../../auth'
import { sendMail } from '../../mail'
/* 
Flow:
  {email,password} = Req.obdy
    |-> check for a user with the same email
    |-> if user doesn't exists
    |---> registeredUser = Register
    |---> done(null,registeredUser.id)
    |-> else
    |---> Login
    |---> done(null,user.id)
 */
const verify: LocalVerifyFunction = async (req, _, __, done) => {
  const { email, password, name } = req.body

  try {
    const user = await User.findOne({ email })

    if (user) {
      if (user.authMethod !== 'local') {
        throw new BadRequest('Please use either google or github to signin')
      }
      // Login
      await validate(loginSchema, req.body)

      if (!(await user.matchesPassword(password))) {
        throw new BadRequest('Incorrect email or password')
      }

      done(null, { user, sessionCreatedAt: Date.now() })
    } else {
      // Register
      await validate(registerSchema, req.body)
      const newUser = await User.create({
        email,
        password,
        name,
        avatar: 'https://gravatar.com/avatar/?s=100&d=retro',
        authMethod: 'local',
      })

      const link = newUser.verificationUrl()

      await sendMail({
        to: email,
        subject: 'Verify your email address',
        html: `<b>Hey ${newUser.name},</b><br/>\tPlease click the link to verify your account<br/><a href="${link}" >${link}</a>`,
        text: `Hey ${newUser.name},\nPlease click the link to verify your account\n<a href="${link}" >${link}</a>`,
      })

      done(null, { user, sessionCreatedAt: Date.now() })
    }
  } catch (e) {
    done(e)
  }
}
export const createLocalPassport = (app: Express) => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        session: true,
        passReqToCallback: true,
      },
      verify
    )
  )

  app.post(
    '/auth/signin',
    guest,
    passport.authenticate('local'),
    catchAsync(async (req, res) => {
      res.json({ ...req.user })
    })
  )

  app.get(
    '/auth/signout',
    auth,
    catchAsync(async (req, res) => {
      await logOut(req, res)

      res.json({ message: 'OK' })
    })
  )
}
