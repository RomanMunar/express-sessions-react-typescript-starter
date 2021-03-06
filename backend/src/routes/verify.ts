import { Router } from 'express'
import { User } from '../models'
import { catchAsync } from '../middleware'
import { validate, resendEmailSchema, verifyEmailSchema } from '../validation'
import { sendMail } from '../mail'
import { BadRequest } from '../errors'
import { markAsVerified } from '../auth'

const router = Router()

router.get(
  '/email/verify',
  catchAsync(async (req, res) => {
    await validate(verifyEmailSchema, req.query)

    const { id } = req.query

    const user = await User.findById(id).select('verifiedAt')

    if (!user || !User.hasValidVerificationUrl(req.originalUrl, req.query)) {
      throw new BadRequest('Invalid activation link')
    }

    if (user.verifiedAt) {
      throw new BadRequest('Email already verified')
    }

    await markAsVerified(user)

    res.send(
      '<h2>Account successfully verified</h2>. <h3><a href="/">Click here to be Redirected to homepage</a></h3>'
    )
  })
)

router.post(
  '/email/resend',
  catchAsync(async (req, res) => {
    await validate(resendEmailSchema, req.body)

    const { email } = req.body

    const user = await User.findOne({ email }).select('email verifiedAt')

    if (user && !user.verifiedAt) {
      const link = user.verificationUrl()

      await sendMail({
        to: email,
        subject: 'Verify your email address',
        html: `<b>Hey ${user.name},</b><br/>\tPlease click the link to verify your account<br/><a href="${link}" >${link}</a>`,
        text: `Hey ${user.name},\nPlease click the link to verify your account\n<a href="${link}" >${link}</a>`,
      })
    }

    res.json({
      message:
        'If your email address needs to be verified, you will receive an email with the activation link',
    })
  })
)

export { router as verify }
