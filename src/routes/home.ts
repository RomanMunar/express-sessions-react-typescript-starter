import { Router } from 'express'
import { auth, catchAsync } from '../middleware'
import { User } from '../models'

const router = Router()

router.get(
  '/isAuth',
  catchAsync(async (req, res) => {
    console.log(req.user)
    console.log(req.isAuthenticated())
    // const user = await User.findById(req.user)
    res.send(req.user)
  })
)

router.get(
  '/home',
  auth,
  catchAsync(async (req, res) => {
    const user = await User.findById(req.user)
    res.json(user)
  })
)

export { router as home }
