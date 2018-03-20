import { IComposer, IComposerContext } from "../interfaces";
export declare class ConstantComposer implements IComposer {
    private constant;
    constructor(constant: any);
    compose(existing: any, context: IComposerContext): any;
}
