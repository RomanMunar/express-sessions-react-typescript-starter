"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordSchema = exports.forgotPasswordSchema = exports.resendEmailSchema = exports.verifyEmailSchema = exports.loginSchema = exports.registerSchema = void 0;
const joi_1 = require("./joi");
const config_1 = require("../config");
const id = joi_1.Joi.objectId().required();
const email = joi_1.Joi.string().email().min(8).max(254).lowercase().trim().required();
const name = joi_1.Joi.string().min(3).max(128).trim().required();
const password = joi_1.Joi.string()
    .min(8)
    .max(config_1.BCRYPT_MAX_BYTES, 'utf8')
    .regex(/^(?=.*?[\p{Lu}])(?=.*?[\p{Ll}])(?=.*?\d).*$/u)
    .message('"{#label}" must contain one uppercase letter, one lowercase letter, and one digit')
    .required();
const passwordConfirmation = joi_1.Joi.valid(joi_1.Joi.ref('password')).required();
exports.registerSchema = joi_1.Joi.object({
    email,
    name,
    password,
    passwordConfirmation,
});
exports.loginSchema = joi_1.Joi.object({
    email,
    password,
});
exports.verifyEmailSchema = joi_1.Joi.object({
    id,
    token: joi_1.Joi.string().length(config_1.EMAIL_VERIFICATION_TOKEN_BYTES).required(),
    expires: joi_1.Joi.date().timestamp().required(),
    signature: joi_1.Joi.string().length(config_1.EMAIL_VERIFICATION_SIGNATURE_BYTES).required(),
});
exports.resendEmailSchema = joi_1.Joi.object({
    email,
});
exports.forgotPasswordSchema = joi_1.Joi.object({
    email,
});
exports.resetPasswordSchema = joi_1.Joi.object({
    query: joi_1.Joi.object({
        id,
        token: joi_1.Joi.string()
            .length(config_1.PASSWORD_RESET_BYTES * 2)
            .required(),
    }),
    body: joi_1.Joi.object({
        password,
        passwordConfirmation,
    }),
});
