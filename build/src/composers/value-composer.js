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
    }
    produceValue(context) {
        return context[this.method](...this.parameters);
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