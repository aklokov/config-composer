"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const array_tools_1 = require("@vlr/array-tools");
const createParameters_1 = require("./createParameters");
const value_composer_1 = require("../composers/value-composer");
const fullRegex = /[\$\#]\{.*?\)\}/g;
function createProducersFromString(src) {
    const matches = array_tools_1.regexToArray(fullRegex, src);
    const result = [];
    let currentIndex = 0;
    for (let match of matches) {
        const matchText = match[0];
        const matchIndex = src.indexOf(matchText, currentIndex);
        const constant = src.substr(currentIndex, matchIndex - currentIndex);
        if (constant.length) {
            result.push(new value_composer_1.StringProducer(constant));
        }
        result.push(createFunctionProducer(matchText));
        currentIndex = matchIndex + matchText.length;
    }
    const constant = src.substr(currentIndex);
    if (constant.length) {
        result.push(new value_composer_1.StringProducer(constant));
    }
    return result;
}
exports.createProducersFromString = createProducersFromString;
const partsRegex = /([^\{\(]*)\((.*)\)/;
function createFunctionProducer(src) {
    const match = partsRegex.exec(src);
    if (!match) {
        return new value_composer_1.PropertyGetProducer(src.substr(2, src.length - 3));
    }
    return new value_composer_1.MethodCallProducer(match[1], createParameters_1.createParameters(match[2]));
}
//# sourceMappingURL=createProducersFromString.js.map