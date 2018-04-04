import { IComposer, IComposerContext } from "../interfaces";
export declare class ObjectComposer implements IComposer {
    private fields;
    constructor(fields: IComposer[]);
    compose(existing: any, context: IComposerContext): any;
}
export declare class FieldComposer implements IComposer {
    private field;
    private value;
    private conditional;
    constructor(field: string, value: IComposer, conditional: boolean);
    compose<T>(existing: T, context: IComposerContext): T;
}
