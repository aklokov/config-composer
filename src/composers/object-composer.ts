import { IComposer, IComposerContext } from "../interfaces";

export class ObjectComposer implements IComposer {
    constructor(private fields: IComposer[]) { }

    public compose(existing: any, context: IComposerContext): any {
        const result = existing ? { ...existing } : {};
        this.fields.forEach(field => field.compose(result, context));
        return result;
    }
}

export class FieldComposer implements IComposer {
    constructor(private field: string, private value: IComposer, private conditional: boolean) {
    }

    public compose<T>(existing: T, context: IComposerContext): T {
        const val = existing[this.field];
        if (val === null || val === undefined || !this.conditional) {
            existing[this.field] = this.value.compose(val, context);
        } else {
            existing[this.field] = context.getUpdatedValue(val, () => this.value.compose(val, context));
        }
        return existing;
    }
}
