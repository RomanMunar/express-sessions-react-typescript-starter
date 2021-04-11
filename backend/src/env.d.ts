import { IUser } from './models'

declare namespace Express {
  interface User {
    user: Omit<IUser, 'password'>
    sessionCreatedAt: number
  }

  interface Request {
    user: Omit<IUser, 'password'>
    sessionCreatedAt: number
  }
}
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string
    APP_PORT: string
    APP_HOSTNAME: string
    APP_PROTOCOL: string
    APP_SECRET: string
    MONGO_USERNAME: string
    MONGO_PASSWORD: string
    MONGO_HOST: string
    MONGO_PORT: string
    MONGO_DATABASE: string
    REDIS_PORT: string
    REDIS_HOST: string
    REDIS_PASSWORD: string
    SESSION_SECRET: string
    SESSION_NAME: string
    SESSION_IDLE_TIMEOUT: string
    SESSION_ABSOLUTE_TIMEOUT: string
    GOOGLE_OAUTH_CLIENT_ID: string
    GOOGLE_OAUTH_CLIENT_SECRET: string
    GITHUB_OAUTH_CLIENT_ID: string
    GITHUB_OAUTH_CLIENT_SECRET: string
    SMTP_HOST: string
    SMTP_PORT: string
    SMTP_USERNAME: string
    SMTP_PASSWORD: string
  }
}
