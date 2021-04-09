"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const config_1 = require("./config");
const routes_1 = require("./routes"); // verify, reset
const middleware_1 = require("./middleware");
const passport_1 = require("./passport");
require('dotenv').config();
const createApp = (store) => {
    const app = express_1.default();
    app.use(express_1.default.static(config_1.STATIC_DIR));
    app.use(express_1.default.json());
    app.use(express_session_1.default({ ...config_1.SESSION_OPTIONS, store }));
    passport_1.startPassport(app);
    app.use(routes_1.upload);
    app.use(middleware_1.active);
    app.use(routes_1.home);
    app.use(routes_1.verify);
    app.use(routes_1.reset);
    app.use(middleware_1.notFound);
    app.use(middleware_1.serverError);
    return app;
};
exports.createApp = createApp;
