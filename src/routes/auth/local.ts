import { createPassport, LocalVerifyFunction } from '../../passport'
import { Express, Request } from 'express'
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
const verify: (
  req: Request,
  username: string,
  password: string,
  done: (error: any, user?: any, msg?: { message: string }) => void
) => void = async (req, _, __, done) => {
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

      done(null, user.id)
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

      console.log({link})
      await sendMail({
        to: email,
        subject: 'Verify your email address',
        text: link,
      })

      done(null, newUser.id)
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
    passport.authenticate('local', {
      passReqToCallback: true,
    }),
    function (_, res) {
      res.json({ message: 'OK' })
    }
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
