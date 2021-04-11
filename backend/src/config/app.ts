import path from 'path'

export const {
  NODE_ENV = 'development',

  APP_PORT = 5000,
  APP_HOSTNAME = 'localhost',
  APP_PROTOCOL = 'http',

  APP_SECRET = '4d2ca599b4189f74a771f44b8a8d06f572208b5649f5ae216f8e94612a267ff0',
} = process.env

export const APP_ORIGIN = `${APP_PROTOCOL}://${APP_HOSTNAME}:${APP_PORT}`

const dirname = path.resolve()
export const STATIC_DIR = path.join(dirname, '/public')
export const FRONTEND_BUILD_DIR = path.join(dirname, '../react-client', 'build')
export const FRONTEND_INDEX = path.join(dirname, '../react-client', 'build', 'index.html')

require('dotenv').config({ path: path.join(dirname, './.env') })

export const IN_PROD = NODE_ENV === 'production'
