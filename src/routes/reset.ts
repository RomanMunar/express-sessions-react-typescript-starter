import { Router } from 'express'
import { catchAsync } from '../middleware'
import { validate, forgotPasswordSchema, resetPasswordSchema } from '../validation'
import { User, PasswordReset } from '../models'
import { sendMail } from '../mail'
import { BadRequest } from '../errors'
import { resetPassword } from '../auth'

const router = Router()

router.post(
  '/password/email',
  catchAsync(async (req, res) => {
    await validate(forgotPasswordSchema, req.body)

    const { email } = req.body
    const user = await User.findOne({ email })

    if (user) {
      const token = PasswordReset.plaintextToken()

      const reset = await PasswordReset.create({ userId: user.id, token })
      const link = reset.url(token)
      await sendMail({
        to: email,
        subject: 'Reset your password',
        html: `<b>Hey ${user.name},</b><br/>\tPlease click the link to reset your password<br/><a href="${link}">${link}</a>`,
        text: `Hey ${user.name},\n\tPlease click the link to reset your password\n<a href="${link}" >${link}</a>`,
      })
    }

    res.json({
      message:
        'If you have an account with us, you will receive an email with a link to reset your password',
    })
  })
)

router.get(
  '/password/reset',
  catchAsync(async (req, res) => {
    const { id, token } = req.query
    res.send(
      `<!DOCTYPE html><html lang="en"><head>  <meta charset="UTF-8" />  <meta http-equiv="X-UA-Compatible" content="IE=edge" />  <meta name="viewport" content="width=device-width, initial-scale=1.0" />  <link rel="stylesheet" href="../style.css" />  <link rel="stylesheet" href="../normalize.css" />  <title>Reset Password</title></head><body>  <div class="error"></div>  <h2 style="font-size: 25px">Reset Password Form</h2>  <label for="newPassword">    New Password    <input id="newPassword" type="password" />  </label>  <label for="newPasswordConfirmation">    New Password Confirmation    <input id="newPasswordConfirmation" type="password" />  </label>  <button id="submit" class="auth-btn">Submit New Password</button></body><script>;const newPassword = document.querySelector('#newPassword');const newPasswordConfirmation = document.querySelector('#newPasswordConfirmation');const error = document.querySelector('.error');const submitBtn = document.querySelector('#submit');const onSubmit = async e => {  e.preventDefault();  const { newpw, confirmnewpw } = {    newpw: newPassword.value,    confirmnewpw: newPasswordConfirmation.value,  };  if (newpw !== confirmnewpw) {    return error.textContent = 'New password did not match the confirmation Password'  };  const config = {    headers: {      'Content-Type': 'application/json',    },    body: JSON.stringify({ password:newpw,passwordConfirmation:confirmnewpw }),    method: 'POST',  };  const data = await fetch(window.location.pathname + window.location.search, config).then(res => res.json);  if (data.message != 'OK') {    error.textContent = 'Failed to reset password'  }};submitBtn.addEventListener('click', onSubmit)</script></html>`
    )
  })
)

router.post(
  '/password/reset',
  catchAsync(async ({ query, body }, res) => {
    await validate(resetPasswordSchema, { query, body })

    const { id, token } = query
    const { password } = body

    const reset = await PasswordReset.findById(id)
    let user

    // @ts-ignore
    if (!reset || !reset.isValid(token) || !(user = await User.findById(reset.userId))) {
      throw new BadRequest('Invalid password reset token')
    }

    await Promise.all([
      resetPassword(user, password),
      PasswordReset.deleteMany({ userId: reset.userId }),
    ])

    await sendMail({
      to: user.email,
      subject: 'Password reset',
      html: `<b>Hey ${user.name},</b><br/>\tYour password has been successfully reset`,
      text: `Hey ${user.name},\n\tYour password has been successfully reset`,
    })

    res.json({ message: 'OK' })
  })
)

export { router as reset }
