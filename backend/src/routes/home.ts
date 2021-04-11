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
    res.json({ ...req.user })
  })
)

export { router as home }
