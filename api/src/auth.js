"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.markAsVerified = exports.logOut = exports.isLoggedIn = void 0;
const config_1 = require("./config");
const isLoggedIn = (req) => req.isAuthenticated();
exports.isLoggedIn = isLoggedIn;
const logOut = (req, res) => new Promise((resolve, reject) => {
    req.logout();
    req.session.destroy((err) => {
        if (err)
            reject(err);
        res.clearCookie(config_1.SESSION_NAME);
        resolve();
    });
});
exports.logOut = logOut;
const markAsVerified = async (user) => {
    user.verifiedAt = new Date();
    await user.save();
};
exports.markAsVerified = markAsVerified;
const resetPassword = async (user, password) => {
    user.password = password;
    await user.save();
};
exports.resetPassword = resetPassword;
