"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PASSWORD_RESET_TIMEOUT = exports.PASSWORD_RESET_BYTES = exports.EMAIL_VERIFICATION_SIGNATURE_BYTES = exports.EMAIL_VERIFICATION_TOKEN_BYTES = exports.EMAIL_VERIFICATION_TIMEOUT = exports.BCRYPT_MAX_BYTES = exports.BCRYPT_WORK_FACTOR = void 0;
const ONE_HOUR = 1000 * 60 * 60;
const TWELVE_HOURS = ONE_HOUR * 12;
// Bcrypt
exports.BCRYPT_WORK_FACTOR = 12;
exports.BCRYPT_MAX_BYTES = 72;
// Verification email
exports.EMAIL_VERIFICATION_TIMEOUT = TWELVE_HOURS;
// sha1 -> 160 bits / 8 = 20 bytes * 2 (hex) = 40 bytes
exports.EMAIL_VERIFICATION_TOKEN_BYTES = 40;
// sha256 -> 256 bits / 8 = 32 bytes * 2 (hex) = 64 bytes
exports.EMAIL_VERIFICATION_SIGNATURE_BYTES = 64;
// Password reset
exports.PASSWORD_RESET_BYTES = 40;
exports.PASSWORD_RESET_TIMEOUT = ONE_HOUR;
