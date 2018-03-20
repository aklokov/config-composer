import { IComposer, IComposerContext } from "../interfaces";

export class ArrayComposer implements IComposer {
    constructor(private items: IComposer[]) { }
    public compose(existing: any[], context: IComposerContext): any[] {
        existing = existing || [];
        return this.items.map((item: IComposer, index: number) => item.compose(existing[index], context));
    }
}
