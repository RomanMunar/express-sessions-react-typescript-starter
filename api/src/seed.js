"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config");
const faker_1 = __importDefault(require("faker"));
const models_1 = require("./models");
const seed = async () => {
    await mongoose_1.default.connect(config_1.MONGO_URI, config_1.MONGO_OPTIONS);
    const users = [];
    for (let i = 0; i < 30; i++) {
        const name = faker_1.default.name.findName();
        const email = faker_1.default.internet.email();
        const avatar = faker_1.default.image.avatar();
        const password = faker_1.default.internet.password();
        const authMethod = faker_1.default.datatype.boolean() ? 'oauth' : 'local';
        const verifiedAt = faker_1.default.datatype.boolean() ? Date.now() : null;
        users.push({ name, email, avatar, password, authMethod, verifiedAt });
    }
    models_1.User.bulkWrite(users);
    await mongoose_1.default.disconnect();
};
seed().catch(e => console.error(e));
