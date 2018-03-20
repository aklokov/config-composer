import { IComposerContext } from "../src";
import { expect } from "chai";

export class TestContext implements IComposerContext {
  constructor(private successCount: number) { }
  public getUpdatedValue(existing: any, method: () => any): any {
    if (this.successCount) {
      this.successCount--;
      return method();
    }
    return existing;
  }

  public getNumber(src: string): number {
    expectString(src);
    return +src;
  }

  public getString(src: number): string {
    expectNumber(src);
    return "" + src;
  }

  public getFirst(src1: string, src2: number): string {
    expectString(src1);
    expectNumber(src2);
    return src1;
  }

  public getSecond(src1: string, src2: number): number {
    expectString(src1);
    expectNumber(src2);
    return src2;
  }
}

function expectString(src: string): void {
  expect(typeof src === "string").to.be.equal(true, "Should be a string");
}

function expectNumber(src: number): void {
  expect(typeof src === "number").to.be.equal(true, "Should be a number");
}
