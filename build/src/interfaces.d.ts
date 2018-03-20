export interface IComposerContext {
    getUpdatedValue(existing: any, method: () => any): any;
}
export interface IComposer {
    compose(existing: any, context: IComposerContext): any;
}
export interface IValueProducer {
    produceValue(context: IComposerContext): any;
}
