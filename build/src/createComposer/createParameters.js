"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createComposer_1 = require("./createComposer");
function createParameters(src) {
    let split = src.replace(/\"/g, "\"").split(",");
    let workingCopy = [], result = [], open = 0, close = 0;
    split.reverse().forEach(a => {
        open += occurrences(a, "(");
        close += occurrences(a, ")");
        workingCopy.push(a);
        if (open === close) {
            result.push(workingCopy.reverse().join());
            workingCopy = [];
        }
    });
    split = result.reverse().map(item => item.trim());
    const normalized = normalizeParameters(split);
    return normalized.map(parm => createParameter(parm));
}
exports.createParameters = createParameters;
function createParameter(src) {
    if (src.startsWith("'")) {
        return src.substr(1, src.length - 2);
    }
    if (Number.isInteger(+src)) {
        return +src;
    }
    switch (src) {
        case "true":
            return true;
        case "false":
            return false;
        case "null":
            return null;
        default:
            return createComposer_1.createComposer("${" + src + "}");
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
function occurrences(source, subString) {
    source += "";
    subString += "";
    if (subString.length <= 0) {
        return (source.length + 1);
    }
    var n = 0, pos = 0, step = subString.length;
    while (true) {
        pos = source.indexOf(subString, pos);
        if (pos >= 0) {
            ++n;
            pos += step;
        }
        else {
            break;
        }
    }
    return n;
}
//# sourceMappingURL=createParameters.js.map