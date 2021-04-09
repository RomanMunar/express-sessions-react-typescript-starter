"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGooglePassport = void 0;
const passport_1 = require("../../passport");
const passport_google_oauth_1 = require("passport-google-oauth");
const config_1 = require("../../config");
const createGooglePassport = (app) => passport_1.createPassport(app, 'google', passport_google_oauth_1.OAuth2Strategy, {
    clientID: config_1.GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: config_1.GOOGLE_OAUTH_CLIENT_SECRET,
    scope: ['profile', 'email'],
});
exports.createGooglePassport = createGooglePassport;
