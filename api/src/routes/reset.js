"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reset = void 0;
const express_1 = require("express");
const middleware_1 = require("../middleware");
const validation_1 = require("../validation");
const models_1 = require("../models");
const mail_1 = require("../mail");
const errors_1 = require("../errors");
const auth_1 = require("../auth");
const router = express_1.Router();
exports.reset = router;
router.post('/password/email', middleware_1.catchAsync(async (req, res) => {
    await validation_1.validate(validation_1.forgotPasswordSchema, req.body);
    const { email } = req.body;
    const user = await models_1.User.findOne({ email });
    if (user) {
        const token = models_1.PasswordReset.plaintextToken();
        const reset = await models_1.PasswordReset.create({ userId: user.id, token });
        const link = reset.url(token);
        await mail_1.sendMail({
            to: email,
            subject: 'Reset your password',
            html: `<b>Hey ${user.name},</b><br/>\tPlease click the link to reset your password<br/><a href="${link}">${link}</a>`,
            text: `Hey ${user.name},\n\tPlease click the link to reset your password\n<a href="${link}" >${link}</a>`,
        });
    }
    res.json({
        message: 'If you have an account with us, you will receive an email with a link to reset your password',
    });
}));
router.get('/password/reset', middleware_1.catchAsync(async (req, res) => {
    const { id, token } = req.query;
    res.send(`<!DOCTYPE html><html lang="en"><head>  <meta charset="UTF-8" />  <meta http-equiv="X-UA-Compatible" content="IE=edge" />  <meta name="viewport" content="width=device-width, initial-scale=1.0" />  <link rel="stylesheet" href="../style.css" />  <link rel="stylesheet" href="../normalize.css" />  <title>Reset Password</title></head><body>  <div class="error"></div>  <h2 style="font-size: 25px">Reset Password Form</h2>  <label for="newPassword">    New Password    <input id="newPassword" type="password" />  </label>  <label for="newPasswordConfirmation">    New Password Confirmation    <input id="newPasswordConfirmation" type="password" />  </label>  <button id="submit" class="auth-btn">Submit New Password</button></body><script>;const newPassword = document.querySelector('#newPassword');const newPasswordConfirmation = document.querySelector('#newPasswordConfirmation');const error = document.querySelector('.error');const submitBtn = document.querySelector('#submit');const onSubmit = async e => {  e.preventDefault();  const { newpw, confirmnewpw } = {    newpw: newPassword.value,    confirmnewpw: newPasswordConfirmation.value,  };  if (newpw !== confirmnewpw) {    return error.textContent = 'New password did not match the confirmation Password'  };  const config = {    headers: {      'Content-Type': 'application/json',    },    body: JSON.stringify({ password:newpw,passwordConfirmation:confirmnewpw }),    method: 'POST',  };  const data = await fetch(window.location.pathname + window.location.search, config).then(res => res.json);  if (data.message != 'OK') {    error.textContent = 'Failed to reset password'  }};submitBtn.addEventListener('click', onSubmit)</script></html>`);
}));
router.post('/password/reset', middleware_1.catchAsync(async ({ query, body }, res) => {
    await validation_1.validate(validation_1.resetPasswordSchema, { query, body });
    const { id, token } = query;
    const { password } = body;
    const reset = await models_1.PasswordReset.findById(id);
    let user;
    // @ts-ignore
    if (!reset || !reset.isValid(token) || !(user = await models_1.User.findById(reset.userId))) {
        throw new errors_1.BadRequest('Invalid password reset token');
    }
    await Promise.all([
        auth_1.resetPassword(user, password),
        models_1.PasswordReset.deleteMany({ userId: reset.userId }),
    ]);
    await mail_1.sendMail({
        to: user.email,
        subject: 'Password reset',
        html: `<b>Hey ${user.name},</b><br/>\tYour password has been successfully reset`,
        text: `Hey ${user.name},\n\tYour password has been successfully reset`,
    });
    res.json({ message: 'OK' });
}));
