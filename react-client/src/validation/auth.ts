import { Joi } from './joi'

const BCRYPT_MAX_BYTES = 72

const email = Joi.string()
  .email({
    minDomainSegments: 2,
    tlds: {
      allow: [
        'com',
        'net',
        'io',
        'edu',
        'org',
        'us',
        'ph',
        '.co',
        'tech',
        'xyz',
        'info',
        'me',
      ],
    },
  })
  .min(8)
  .max(254)
  .lowercase()
  .trim()
  .required()

const name = Joi.string().min(3).max(128).trim().required()

const password = Joi.string()
  .min(8)
  .max(BCRYPT_MAX_BYTES)
  .regex(/^(?=.*?[\p{Lu}])(?=.*?[\p{Ll}])(?=.*?\d).*$/u)
  .message(
    '"{#label}" must contain one uppercase letter, one lowercase letter, and one digit'
  )
  .required()

const passwordConfirmation = Joi.valid(Joi.ref('password')).required()

export const registerSchema = Joi.object({
  email,
  name,
  password,
  passwordConfirmation,
})

export const loginSchema = Joi.object({
  email,
  password,
})

export const resendEmailSchema = Joi.object({
  email,
})

export const forgotPasswordSchema = Joi.object({
  email,
})
