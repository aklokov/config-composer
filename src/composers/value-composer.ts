import { IValueProducer, IComposer, IComposerContext } from "../interfaces";

export class ValueComposer implements IComposer {
  constructor(private values: IValueProducer[]) { }

  public compose(existing: any, context: IComposerContext): any {
    if (this.values.length === 1) {
      return this.values[0].produceValue(context);
    }

    const strings = this.values.map(val => val.produceValue(context).toString());
    return strings.join("");
  }
}

export class StringProducer implements IValueProducer {
  constructor(private constant: string) { }
  public produceValue(context: IComposerContext): any {
    return this.constant;
  }
}

export class MethodCallProducer implements IValueProducer {
  constructor(private method: string, private parameters: any[]) { }

  public produceValue(context: IComposerContext): any {
    if (!context[this.method]) {
      console.error(`context is supposed to have method ${this.method}`);
      return null;
    }

    return context[this.method](...this.parameters);
  }
}

export class PropertyGetProducer implements IValueProducer {
  constructor(private property: string) { }

  public produceValue(context: IComposerContext): any {
    return context[this.property];
  }
}
