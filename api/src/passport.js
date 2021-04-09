"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPassport = exports.startPassport = void 0;
const passport_1 = __importDefault(require("passport"));
const models_1 = require("./models");
const config_1 = require("./config");
const middleware_1 = require("./middleware");
const index_1 = require("./routes/auth/index");
const startPassport = (app) => {
    passport_1.default.serializeUser((user, done) => done(null, user));
    passport_1.default.deserializeUser((user, done) => done(null, user));
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    index_1.createGooglePassport(app);
    index_1.createGithubPassport(app);
    index_1.createLocalPassport(app);
};
exports.startPassport = startPassport;
const defaultVerifyFunction = async (_, __, ___, profile, done) => {
    const { email, name, avatar } = {
        name: profile.displayName || '',
        avatar: profile.photos[0].value,
        email: profile.email || profile.emails[0].value,
    };
    try {
        let user = await models_1.User.findOne({ email });
        if (!user) {
            user = await models_1.User.create({
                email,
                name,
                avatar,
                authMethod: 'oauth',
                verifiedAt: new Date(), // oauth accounts don't need to be verified
            });
        }
        done(null, { userId: user.id, sessionCreatedAt: Date.now() });
    }
    catch (e) {
        done(e);
    }
};
const createPassport = (app, service, Strategy, strategyConfig, { preRequest = (_req) => { }, postRequest = (_req) => { } } = {}, verify = defaultVerifyFunction) => {
    passport_1.default.use(new Strategy({
        ...strategyConfig,
        callbackURL: `${config_1.APP_ORIGIN}/auth/${service}/callback`,
    }, verify));
    app.get(`/auth/${service}/`, middleware_1.guest, middleware_1.catchAsync(async (req, res, next) => {
        if (preRequest) {
            await preRequest(req);
        }
        passport_1.default.authenticate(service, {
            session: true,
        })(req, res, next);
    }));
    app.get(`/auth/${service}/callback`, passport_1.default.authenticate(service, {
        session: true,
        successRedirect: '/home',
        passReqToCallback: true,
    }), middleware_1.catchAsync(async (req, _, next) => {
        if (postRequest) {
            await postRequest(req);
        }
        next();
    }));
};
exports.createPassport = createPassport;
