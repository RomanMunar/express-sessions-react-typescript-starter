"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGO_OPTIONS = exports.MONGO_URI = void 0;
const { MONGO_USERNAME = 'admin', MONGO_PASSWORD = 'secret', MONGO_HOST = 'localhost', MONGO_PORT = 27017, MONGO_DATABASE = 'auth', } = process.env;
exports.MONGO_URI = `mongodb://${MONGO_USERNAME}:${encodeURIComponent(MONGO_PASSWORD)}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`;
exports.MONGO_OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
