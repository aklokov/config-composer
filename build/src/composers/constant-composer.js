"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ConstantComposer {
    constructor(constant) {
        this.constant = constant;
    }
    compose(existing, context) {
        return this.constant;
    }
}
exports.ConstantComposer = ConstantComposer;
//# sourceMappingURL=constant-composer.js.map