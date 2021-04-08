import { createPassport } from '../../passport'
import { Express } from 'express'
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth'
import { GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_CLIENT_SECRET } from '../../config'

type VerifyFunction = (
  req: Request,
  accessToken: string,
  refreshToken: string,
  profile: any,
  done: (error: any, user?: any, msg?: string) => void
) => void

export const createGooglePassport = (app: Express) =>
  createPassport(app, 'google', GoogleStrategy, {
    clientID: GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: GOOGLE_OAUTH_CLIENT_SECRET,
    scope: ['profile', 'email'],
  })
