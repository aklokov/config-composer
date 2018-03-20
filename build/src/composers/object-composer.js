"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ObjectComposer {
    constructor(fields) {
        this.fields = fields;
    }
    compose(existing, context) {
        const result = existing ? Object.assign({}, existing) : {};
        this.fields.forEach(field => field.compose(result, context));
        return result;
    }
}
exports.ObjectComposer = ObjectComposer;
class FieldComposer {
    constructor(field, value, unconditional) {
        this.field = field;
        this.value = value;
        this.unconditional = unconditional;
    }
    compose(existing, context) {
        const val = existing[this.field];
        if (val === null || val === undefined || this.unconditional) {
            existing[this.field] = this.value.compose(val, context);
        }
        else {
            existing[this.field] = context.getUpdatedValue(val, () => this.value.compose(val, context));
        }
        return existing;
    }
}
exports.FieldComposer = FieldComposer;
//# sourceMappingURL=object-composer.js.map