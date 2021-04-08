import { Options } from 'nodemailer/lib/smtp-connection'
import { IN_PROD, APP_HOSTNAME } from './app'

/* 
  We can use gmail on prod
  {
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: GOOGLE_MAIL_USERNAME, romanmunar
      pass: GOOGLE_MAIL_PASSWORD, r***********
      clientId: GOOGLE_OAUTH_CLIENTID, 
      clientSecret: GOOGLE_OAUTH_CLIENT_SECRET,
      refreshToken: GOOGLE_OAUTH_REFRESH_TOKEN
    }
  }
*/

// Generate your own keys on https://mailtrap.io go to their pricing page and click try free
const {
  SMTP_HOST = 'smtp.mailtrap.io',
  SMTP_PORT = 2525,
  SMTP_USERNAME = '53e4210edec18a',
  SMTP_PASSWORD = '5ea36486cfcbdb',
} = process.env

export const SMTP_OPTIONS: Options = {
  host: SMTP_HOST,
  port: +SMTP_PORT,
  secure: IN_PROD,
  auth: {
    user: SMTP_USERNAME,
    pass: SMTP_PASSWORD,
  },
}

export const MAIL_FROM = `noreply@${APP_HOSTNAME}`
