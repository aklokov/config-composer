"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeChecks_1 = require("./typeChecks");
const constant_composer_1 = require("../composers/constant-composer");
const array_composer_1 = require("../composers/array-composer");
const value_composer_1 = require("../composers/value-composer");
const object_composer_1 = require("../composers/object-composer");
const createProducersFromString_1 = require("./createProducersFromString");
const objectMap_1 = require("@vlr/map-tools/objectMap");
function createComposer(config) {
    if (typeChecks_1.isConstant(config)) {
        return new constant_composer_1.ConstantComposer(config);
    }
    if (Array.isArray(config)) {
        const array = config;
        const children = array.map(item => createComposer(item));
        return new array_composer_1.ArrayComposer(children);
    }
    if (typeChecks_1.isString(config)) {
        return new value_composer_1.ValueComposer(createProducersFromString_1.createProducersFromString(config));
    }
    return new object_composer_1.ObjectComposer(createObjectFieldComposers(config));
}
exports.createComposer = createComposer;
function createObjectFieldComposers(config) {
    const fields = objectMap_1.keys(config);
    return fields.map(field => createFieldComposer(config, field));
}
function createFieldComposer(config, field) {
    const fieldVal = objectMap_1.get(config, field);
    return new object_composer_1.FieldComposer(field, createComposer(fieldVal), typeChecks_1.isConditional(fieldVal));
}
//# sourceMappingURL=createComposer.js.map