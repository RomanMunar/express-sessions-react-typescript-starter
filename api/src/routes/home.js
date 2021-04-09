"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.home = void 0;
const express_1 = require("express");
const middleware_1 = require("../middleware");
const models_1 = require("../models");
const router = express_1.Router();
exports.home = router;
router.get('/isAuth', middleware_1.catchAsync(async (req, res) => {
    // const user = await User.findById(req.user)
    const message = req.isAuthenticated() ? 'OK' : "You're not signed in";
    res.json({ message });
}));
router.get('/home', middleware_1.auth, middleware_1.catchAsync(async (req, res) => {
    const user = await models_1.User.findById(req.user?.userId);
    res.json(user);
}));
