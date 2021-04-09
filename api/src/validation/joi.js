"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.Joi = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const joi_1 = __importDefault(require("@hapi/joi"));
const errors_1 = require("../errors");
const objectId = joi => ({
    type: 'objectId',
    base: joi.string(),
    messages: {
        objectId: '"{#label}" is not a valid ID',
    },
    validate(value, helpers) {
        if (!mongoose_1.default.Types.ObjectId.isValid(value)) {
            return { value, errors: helpers.error('objectId') };
        }
    },
});
exports.Joi = joi_1.default.extend(objectId);
const validate = async (schema, payload) => {
    try {
        await schema.validateAsync(payload, { abortEarly: false });
    }
    catch (e) {
        throw new errors_1.BadRequest(e);
    }
};
exports.validate = validate;
