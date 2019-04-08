import { IComposer, IComposerContext } from "../interfaces";
export declare class ArrayComposer implements IComposer {
    private items;
    constructor(items: IComposer[]);
    compose(existing: any[], context: IComposerContext): any[];
}
