"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLocalPassport = void 0;
const passport_local_1 = require("passport-local");
const passport_1 = __importDefault(require("passport"));
const models_1 = require("../../models");
const errors_1 = require("../../errors");
const middleware_1 = require("../../middleware");
const validation_1 = require("../../validation");
const auth_1 = require("../../auth");
const mail_1 = require("../../mail");
/*
Flow:
  {email,password} = Req.obdy
    |-> check for a user with the same email
    |-> if user doesn't exists
    |---> registeredUser = Register
    |---> done(null,registeredUser.id)
    |-> else
    |---> Login
    |---> done(null,user.id)
 */
const verify = async (req, _, __, done) => {
    const { email, password, name } = req.body;
    try {
        const user = await models_1.User.findOne({ email });
        if (user) {
            if (user.authMethod !== 'local') {
                throw new errors_1.BadRequest('Please use either google or github to signin');
            }
            // Login
            await validation_1.validate(validation_1.loginSchema, req.body);
            if (!(await user.matchesPassword(password))) {
                throw new errors_1.BadRequest('Incorrect email or password');
            }
            done(null, { userId: user.id, sessionCreatedAt: Date.now() });
        }
        else {
            // Register
            await validation_1.validate(validation_1.registerSchema, req.body);
            const newUser = await models_1.User.create({
                email,
                password,
                name,
                avatar: 'https://gravatar.com/avatar/?s=100&d=retro',
                authMethod: 'local',
            });
            const link = newUser.verificationUrl();
            await mail_1.sendMail({
                to: email,
                subject: 'Verify your email address',
                html: `<b>Hey ${newUser.name},</b><br/>\tPlease click the link to verify your account<br/><a href="${link}" >${link}</a>`,
                text: `Hey ${newUser.name},\nPlease click the link to verify your account\n<a href="${link}" >${link}</a>`,
            });
            done(null, { userId: newUser.id, sessionCreatedAt: Date.now() });
        }
    }
    catch (e) {
        done(e);
    }
};
const createLocalPassport = (app) => {
    passport_1.default.use(new passport_local_1.Strategy({
        usernameField: 'email',
        passwordField: 'password',
        session: true,
        passReqToCallback: true,
    }, verify));
    app.post('/auth/signin', middleware_1.guest, passport_1.default.authenticate('local', {
        passReqToCallback: true,
    }), (_, res) => {
        res.json({ message: 'OK' });
    });
    app.get('/auth/signout', middleware_1.auth, middleware_1.catchAsync(async (req, res) => {
        await auth_1.logOut(req, res);
        res.json({ message: 'OK' });
    }));
};
exports.createLocalPassport = createLocalPassport;
