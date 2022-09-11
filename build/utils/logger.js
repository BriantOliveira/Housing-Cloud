"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createChildLogger = void 0;
const winston_1 = require("winston");
const customFormat = winston_1.format.combine(winston_1.format.errors({ stack: true }), winston_1.format.label({ label: "BACKEND" }), winston_1.format.timestamp({ format: "MM/DD/YYYY HH:mm:ss" }), 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
winston_1.format.printf((info) => {
    const { timestamp, label, level, message, event } = info, rest = __rest(info, ["timestamp", "label", "level", "message", "event"]);
    return `[${timestamp}][${label}][${level.toUpperCase()}]${event ? `[${event}]` : ""}: ${message}${Object.keys(rest).length ? `\n${JSON.stringify(rest, null, 2)}` : ""}`;
}));
const logger = (0, winston_1.createLogger)({
    level: process.env.NODE_ENV === "production" ||
        process.env.NODE_ENV === "dev" ||
        process.env.NODE_ENV === "staging"
        ? "info"
        : "debug",
    format: customFormat,
    transports: [
        new winston_1.transports.File({ filename: "error.log", level: "error" }),
        new winston_1.transports.File({ filename: "combined.log" }),
        new winston_1.transports.Console({ format: customFormat }),
    ],
});
/**
 * Used to override the logger meta
 * ex: adding the service to the logger
 */
const createChildLogger = (service) => {
    return logger.child({ service });
};
exports.createChildLogger = createChildLogger;
exports.default = logger;
//# sourceMappingURL=logger.js.map