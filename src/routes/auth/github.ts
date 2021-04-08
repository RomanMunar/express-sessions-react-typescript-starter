import { createPassport } from '../../passport'
import { Express } from 'express'
import { Strategy as GithubStrategy } from 'passport-github2'
import { GITHUB_OAUTH_CLIENT_ID, GITHUB_OAUTH_CLIENT_SECRET } from '../../config'

export const createGithubPassport = (app: Express) =>
  createPassport(app, 'github', GithubStrategy, {
    clientID: GITHUB_OAUTH_CLIENT_ID,
    clientSecret: GITHUB_OAUTH_CLIENT_SECRET,
    scope: ['user:email'],
  })
