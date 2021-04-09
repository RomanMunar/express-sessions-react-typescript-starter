import { Request, Response } from 'express'
import { SESSION_NAME } from './config'
import { UserDocument } from './models'

export const isLoggedIn = (req: Request) => req.isAuthenticated()

export const logOut = (req: Request, res: Response) =>
  new Promise<void>((resolve, reject) => {
    req.logout()
    req.session!.destroy((err: Error) => {
      if (err) reject(err)

      res.clearCookie(SESSION_NAME)

      resolve()
    })
  })

export const markAsVerified = async (user: UserDocument) => {
  user.verifiedAt = new Date()
  await user.save()
}

export const resetPassword = async (user: UserDocument, password: string) => {
  user.password = password
  await user.save()
}
