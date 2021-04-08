import { Router } from 'express'
import { catchAsync } from '../middleware'
import { upload as uploadFile } from '../config'
import { STATIC_DIR } from '../config'
const router = Router()

router.post(
  '/upload',
  uploadFile.single('image'),
  catchAsync(async (req, res) => {
    res.json({ path: `/${req.file.path.split(STATIC_DIR)[1]}`, message: 'OK' })
  })
)

export { router as upload }
