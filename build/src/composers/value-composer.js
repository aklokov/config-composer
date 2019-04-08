"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ValueComposer {
    constructor(values) {
        this.values = values;
    }
    compose(existing, context) {
        if (this.values.length === 1) {
            return this.values[0].produceValue(context);
        }
        const strings = this.values.map(val => val.produceValue(context).toString());
        return strings.join("");
    }
}
exports.ValueComposer = ValueComposer;
class StringProducer {
    constructor(constant) {
        this.constant = constant;
    }
    produceValue(context) {
        return this.constant;
    }
}
exports.StringProducer = StringProducer;
class MethodCallProducer {
    constructor(method, parameters) {
        this.method = method;
        this.parameters = parameters;
        this.method = method.trim();
    }
    produceValue(context) {
        if (!context[this.method]) {
            console.error(`context is supposed to have method ${this.method}`);
            return null;
        }
        var params = this.parameters.map(val => val instanceof ValueComposer ? val.compose(null, context) : val);
        return context[this.method](...params);
    }
}
exports.MethodCallProducer = MethodCallProducer;
class PropertyGetProducer {
    constructor(property) {
        this.property = property;
    }
    produceValue(context) {
        return context[this.property];
    }
}
exports.PropertyGetProducer = PropertyGetProducer;
//# sourceMappingURL=value-composer.js.map