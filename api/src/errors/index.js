"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unauthorized = exports.BadRequest = void 0;
class HttpError extends Error {
}
class BadRequest extends HttpError {
    constructor(message = 'Bad Request') {
        super(message);
        this.status = 400;
    }
}
exports.BadRequest = BadRequest;
class Unauthorized extends HttpError {
    constructor(message = 'Unauthorized') {
        super(message);
        this.status = 401;
    }
}
exports.Unauthorized = Unauthorized;
