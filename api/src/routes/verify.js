"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = void 0;
const express_1 = require("express");
const models_1 = require("../models");
const middleware_1 = require("../middleware");
const validation_1 = require("../validation");
const mail_1 = require("../mail");
const errors_1 = require("../errors");
const auth_1 = require("../auth");
const router = express_1.Router();
exports.verify = router;
router.get('/email/verify', middleware_1.catchAsync(async (req, res) => {
    await validation_1.validate(validation_1.verifyEmailSchema, req.query);
    const { id } = req.query;
    const user = await models_1.User.findById(id).select('verifiedAt');
    if (!user || !models_1.User.hasValidVerificationUrl(req.originalUrl, req.query)) {
        throw new errors_1.BadRequest('Invalid activation link');
    }
    if (user.verifiedAt) {
        throw new errors_1.BadRequest('Email already verified');
    }
    await auth_1.markAsVerified(user);
    res.send('<h2>Account successfully verified</h2>. <h3><a href="/">Click here to be Redirected to homepage</a></h3>');
}));
router.post('/email/resend', middleware_1.catchAsync(async (req, res) => {
    await validation_1.validate(validation_1.resendEmailSchema, req.body);
    const { email } = req.body;
    const user = await models_1.User.findOne({ email }).select('email verifiedAt');
    if (user && !user.verifiedAt) {
        const link = user.verificationUrl();
        await mail_1.sendMail({
            to: email,
            subject: 'Verify your email address',
            html: `<b>Hey ${user.name},</b><br/>\tPlease click the link to verify your account<br/><a href="${link}" >${link}</a>`,
            text: `Hey ${user.name},\nPlease click the link to verify your account\n<a href="${link}" >${link}</a>`,
        });
    }
    res.json({
        message: 'If your email address needs to be verified, you will receive an email with the activation link',
    });
}));
