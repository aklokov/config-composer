"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ArrayComposer {
    constructor(items) {
        this.items = items;
    }
    compose(existing, context) {
        existing = existing || [];
        return this.items.map((item, index) => item.compose(existing[index], context));
    }
}
exports.ArrayComposer = ArrayComposer;
//# sourceMappingURL=array-composer.js.map