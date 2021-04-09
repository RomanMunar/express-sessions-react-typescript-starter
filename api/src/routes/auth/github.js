"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGithubPassport = void 0;
const passport_1 = require("../../passport");
const passport_github2_1 = require("passport-github2");
const config_1 = require("../../config");
const createGithubPassport = (app) => passport_1.createPassport(app, 'github', passport_github2_1.Strategy, {
    clientID: config_1.GITHUB_OAUTH_CLIENT_ID,
    clientSecret: config_1.GITHUB_OAUTH_CLIENT_SECRET,
    scope: ['user:email'],
});
exports.createGithubPassport = createGithubPassport;
