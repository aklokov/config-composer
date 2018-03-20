"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createParameters(src) {
    const split = src.replace(/\"/g, "\"").split(",");
    const normalized = normalizeParameters(split);
    return normalized.map(parm => createParameter(parm));
}
exports.createParameters = createParameters;
function createParameter(src) {
    if (src.startsWith("'")) {
        return src.substr(1, src.length - 2);
    }
    switch (src) {
        case "true":
            return true;
        case "false":
            return false;
        case "null":
            return null;
        default:
            return +src;
    }
}
function normalizeParameters(split) {
    const result = [];
    let cur = "";
    for (let parm of split) {
        cur += parm;
        if (cur.startsWith("\"") && !cur.endsWith("\"")) {
            continue;
        }
        result.push(cur);
        cur = "";
    }
    return result;
}
//# sourceMappingURL=createParameters.js.map