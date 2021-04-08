import path from 'path'
import multer from 'multer'
import { STATIC_DIR } from './app'

interface FileFilterCallback {
  (error: Error): void
  (error: null, acceptFile: boolean): void
}

const storage = multer.diskStorage({
  destination(_, __, cb) {
    cb(null, STATIC_DIR)
  },
  filename(_, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
  },
})

const checkFileType = (file: Express.Multer.File, cb: FileFilterCallback) => {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb(new Error('Images only!'))
  }
}

export const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})
