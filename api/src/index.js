"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const ioredis_1 = __importDefault(require("ioredis"));
const config_1 = require("./config");
const app_1 = require("./app");
const chalk_1 = __importDefault(require("chalk"));
const main = async () => {
    await mongoose_1.default.connect(config_1.MONGO_URI, config_1.MONGO_OPTIONS);
    const RedisStore = connect_redis_1.default(express_session_1.default);
    const client = new ioredis_1.default(config_1.REDIS_OPTIONS);
    const store = new RedisStore({ client });
    const app = app_1.createApp(store);
    app.listen(config_1.APP_PORT, () => console.log(chalk_1.default.green(`
  +========================================+
  |                                        |
  |  Server Ready at ${config_1.APP_ORIGIN} |
  |                                        |
  +========================================+`)));
};
main().catch(error => console.error(error));
