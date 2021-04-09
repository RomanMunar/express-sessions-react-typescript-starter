"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcryptjs_1 = require("bcryptjs");
const crypto_1 = require("crypto");
const config_1 = require("../config");
const userSchema = new mongoose_1.Schema({
    email: String,
    name: String,
    authMethod: String,
    verifiedAt: { type: Date, required: false },
    password: { type: String, required: false },
    avatar: { type: String, required: false },
}, {
    timestamps: true,
});
userSchema.pre('save', async function () {
    if (this.isModified('password')) {
        if (this.password)
            this.password = await bcryptjs_1.hash(this.password, config_1.BCRYPT_WORK_FACTOR);
    }
});
userSchema.methods.matchesPassword = function (password) {
    return this.password ? bcryptjs_1.compare(password, this.password) : true;
};
userSchema.methods.verificationUrl = function () {
    const token = crypto_1.createHash('sha1').update(this.email).digest('hex');
    const expires = Date.now() + config_1.EMAIL_VERIFICATION_TIMEOUT;
    const url = `${config_1.APP_ORIGIN}/email/verify?id=${this.id}&token=${token}&expires=${expires}`;
    const signature = exports.User.signVerificationUrl(url);
    return `${url}&signature=${signature}`;
};
userSchema.statics.signVerificationUrl = (url) => crypto_1.createHmac('sha256', config_1.APP_SECRET).update(url).digest('hex');
userSchema.statics.hasValidVerificationUrl = (path, query) => {
    const url = `${config_1.APP_ORIGIN}${path}`;
    const original = url.slice(0, url.lastIndexOf('&'));
    const signature = exports.User.signVerificationUrl(original);
    return (crypto_1.timingSafeEqual(Buffer.from(signature), Buffer.from(query.signature)) &&
        +query.expires > Date.now());
};
userSchema.set('toJSON', {
    // @ts-ignore
    transform: (_, { __v, password, ...rest }) => rest,
});
exports.User = mongoose_1.model('User', userSchema);
