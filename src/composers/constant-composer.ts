import { IComposer, IComposerContext } from "../interfaces";

export class ConstantComposer implements IComposer {
    constructor(private constant: any) { }
    public compose(existing: any, context: IComposerContext): any {
        return this.constant;
    }
}
