"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = require("./config");
const transporter = nodemailer_1.default.createTransport(config_1.SMTP_OPTIONS);
const sendMail = (options) => transporter.sendMail({
    ...options,
    from: config_1.MAIL_FROM,
});
exports.sendMail = sendMail;
