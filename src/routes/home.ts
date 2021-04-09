import { Router } from 'express'
import { auth, catchAsync } from '../middleware'
import { User } from '../models'

const router = Router()

router.get(
  '/isAuth',
  catchAsync(async (req, res) => {
    // const user = await User.findById(req.user)
    const message = req.isAuthenticated() ? 'OK' : "You're not signed in"
    res.json({ message })
  })
)

router.get(
  '/home',
  auth,
  catchAsync(async (req, res) => {
    const user = await User.findById(req.user?.userId)
    res.json(user)
  })
)

export { router as home }
