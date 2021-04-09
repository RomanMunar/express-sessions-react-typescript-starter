"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const express_1 = require("express");
const middleware_1 = require("../middleware");
const config_1 = require("../config");
const config_2 = require("../config");
const router = express_1.Router();
exports.upload = router;
router.post('/upload', config_1.upload.single('image'), middleware_1.catchAsync(async (req, res) => {
    res.json({ path: `/${req.file.path.split(config_2.STATIC_DIR + '/')[1]}`, message: 'OK' });
}));
