import { Schema, model, Document, Model } from 'mongoose'
import { hash, compare } from 'bcryptjs'
import { createHash, createHmac, timingSafeEqual } from 'crypto'
import {
  BCRYPT_WORK_FACTOR,
  APP_SECRET,
  EMAIL_VERIFICATION_TIMEOUT,
  APP_ORIGIN,
} from '../config'

export interface IUser {
  _id: string
  email: string
  name: string
  authMethod: 'oauth' | 'local'
  password?: string
  verifiedAt?: Date
  avatar?: string
}

export interface UserDocument extends Document {
  email: string
  name: string
  authMethod: 'oauth' | 'local'
  password?: string
  verifiedAt?: Date
  avatar?: string
  matchesPassword: (password: string) => Promise<boolean>
  verificationUrl: () => string
}

interface UserModel extends Model<UserDocument> {
  signVerificationUrl: (url: string) => string
  hasValidVerificationUrl: (path: string, query: any) => boolean
}

const userSchema = new Schema<UserDocument>(
  {
    email: String,
    name: String,
    authMethod: String,
    verifiedAt: { type: Date, required: false },
    password: { type: String, required: false },
    avatar: { type: String, required: false },
  },
  {
    timestamps: true,
  }
)

userSchema.pre<UserDocument>('save', async function () {
  if (this.isModified('password')) {
    if (this.password) this.password = await hash(this.password, BCRYPT_WORK_FACTOR)
  }
})

userSchema.methods.matchesPassword = function (password: string) {
  return this.password ? compare(password, this.password) : true
}

userSchema.methods.verificationUrl = function () {
  const token = createHash('sha1').update(this.email).digest('hex')
  const expires = Date.now() + EMAIL_VERIFICATION_TIMEOUT

  const url = `${APP_ORIGIN}/email/verify?id=${this.id}&token=${token}&expires=${expires}`
  const signature = User.signVerificationUrl(url)

  return `${url}&signature=${signature}`
}

userSchema.statics.signVerificationUrl = (url: string) =>
  createHmac('sha256', APP_SECRET).update(url).digest('hex')

userSchema.statics.hasValidVerificationUrl = (path: string, query: any) => {
  const url = `${APP_ORIGIN}${path}`
  const original = url.slice(0, url.lastIndexOf('&'))
  const signature = User.signVerificationUrl(original)

  return (
    timingSafeEqual(Buffer.from(signature), Buffer.from(query.signature)) &&
    +query.expires > Date.now()
  )
}

userSchema.set('toJSON', {
  // @ts-ignore
  transform: (_, { __v, password, ...rest }) => rest,
})

export const User = model<UserDocument, UserModel>('User', userSchema)
