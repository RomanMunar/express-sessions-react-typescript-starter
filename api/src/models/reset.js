"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordReset = void 0;
const mongoose_1 = require("mongoose");
const crypto_1 = require("crypto");
const config_1 = require("../config");
const passwordResetSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
    token: String,
    expiredAt: Date,
}, {
    timestamps: { createdAt: true, updatedAt: false },
});
passwordResetSchema.pre('save', function () {
    if (this.isModified('token')) {
        this.token = exports.PasswordReset.hashedToken(this.token);
    }
    if (!this.expiredAt) {
        this.expiredAt = new Date(new Date().getTime() + config_1.PASSWORD_RESET_TIMEOUT);
    }
});
passwordResetSchema.methods.url = function (plaintextToken) {
    return `${config_1.APP_ORIGIN}/password/reset?id=${this.id}&token=${plaintextToken}`;
};
passwordResetSchema.methods.isValid = function (plaintextToken) {
    const hash = exports.PasswordReset.hashedToken(plaintextToken);
    return (crypto_1.timingSafeEqual(Buffer.from(hash), Buffer.from(this.token)) &&
        this.expiredAt > new Date());
};
passwordResetSchema.statics.plaintextToken = () => {
    return crypto_1.randomBytes(config_1.PASSWORD_RESET_BYTES).toString('hex');
};
passwordResetSchema.statics.hashedToken = (plaintextToken) => {
    return crypto_1.createHmac('sha256', config_1.APP_SECRET).update(plaintextToken).digest('hex');
};
exports.PasswordReset = mongoose_1.model('PasswordReset', passwordResetSchema);
