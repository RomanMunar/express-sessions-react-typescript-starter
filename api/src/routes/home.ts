import { Router } from 'express'
import { auth, catchAsync } from '../middleware'

const router = Router()

router.get(
  '/isAuth',
  catchAsync(async (req, res) => {
    const message = req.isAuthenticated() ? 'OK' : "You're not signed in"
    res.json({ message })
  })
)

router.get(
  '/home',
  auth,
  catchAsync(async (req, res) => {
    //@ts-ignore
    res.json({ ...req.user.user })
  })
)

export { router as home }
