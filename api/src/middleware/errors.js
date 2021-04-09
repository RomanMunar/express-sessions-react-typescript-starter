"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverError = exports.notFound = exports.catchAsync = void 0;
const catchAsync = (handler) => (...args) => 
// @ts-ignore
handler(...args).catch(args[2]);
exports.catchAsync = catchAsync;
const notFound = (req, res, next) => res.status(404).json({ message: 'Not Found' });
exports.notFound = notFound;
const serverError = (err, req, res, next) => {
    if (!err.status) {
        console.error(err.stack);
    }
    res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
};
exports.serverError = serverError;
