"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IN_PROD = exports.STATIC_DIR = exports.APP_ORIGIN = exports.APP_SECRET = exports.APP_PROTOCOL = exports.APP_HOSTNAME = exports.APP_PORT = exports.NODE_ENV = void 0;
const path_1 = __importDefault(require("path"));
_a = process.env, _b = _a.NODE_ENV, exports.NODE_ENV = _b === void 0 ? 'development' : _b, _c = _a.APP_PORT, exports.APP_PORT = _c === void 0 ? 3000 : _c, _d = _a.APP_HOSTNAME, exports.APP_HOSTNAME = _d === void 0 ? 'localhost' : _d, _e = _a.APP_PROTOCOL, exports.APP_PROTOCOL = _e === void 0 ? 'http' : _e, _f = _a.APP_SECRET, exports.APP_SECRET = _f === void 0 ? '4d2ca599b4189f74a771f44b8a8d06f572208b5649f5ae216f8e94612a267ff0' : _f;
exports.APP_ORIGIN = `${exports.APP_PROTOCOL}://${exports.APP_HOSTNAME}:${exports.APP_PORT}`;
const dirname = path_1.default.resolve();
exports.STATIC_DIR = path_1.default.join(dirname, '/public');
exports.IN_PROD = exports.NODE_ENV === 'production';
