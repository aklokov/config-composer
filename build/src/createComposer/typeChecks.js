"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isConstant(value) {
    return value === true || value === false
        || value === null || value === undefined
        || typeof value === "number";
}
exports.isConstant = isConstant;
function isString(value) {
    return typeof value === "string";
}
exports.isString = isString;
function isUnconditional(value) {
    return !isConstant(value) && !isString(value) && !Array.isArray(value);
}
exports.isUnconditional = isUnconditional;
//# sourceMappingURL=typeChecks.js.map