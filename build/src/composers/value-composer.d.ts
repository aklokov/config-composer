import { IValueProducer, IComposer, IComposerContext } from "../interfaces";
export declare class ValueComposer implements IComposer {
    private values;
    constructor(values: IValueProducer[]);
    compose(existing: any, context: IComposerContext): any;
}
export declare class StringProducer implements IValueProducer {
    private constant;
    constructor(constant: string);
    produceValue(context: IComposerContext): any;
}
export declare class MethodCallProducer implements IValueProducer {
    private method;
    private parameters;
    constructor(method: string, parameters: any[]);
    produceValue(context: IComposerContext): any;
}
export declare class PropertyGetProducer implements IValueProducer {
    private property;
    constructor(property: string);
    produceValue(context: IComposerContext): any;
}
