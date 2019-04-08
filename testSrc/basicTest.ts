import { expect } from "chai";
import { compose } from "../src";
import { TestContext } from "./test-context";

describe("basic compose", function (): void {
  it("should compose an object", function (): void {
    // arrange
    const config = {
      field1: 10,
      field2: "start ${getString(10)}",
      field3: "${getNumber('12')} end",
      field4: "start ${getFirst('10', 11)} mid ${getSecond('12', 13)} end",
      field5: {
        field7: "${getNumber('22')}"
      },
      field6: "${ getNumber( getString( getNumber( '11' ) ) )} end",
    };
    const context = new TestContext(10);

    // act
    const result = compose(null, config, context);

    // assert
    expect(result.field1).to.be.equal(10);
    expect(result.field2).to.be.equal("start 10");
    expect(result.field3).to.be.equal("12 end");
    expect(result.field4).to.be.equal("start 10 mid 13 end");
    expect(result.field5.field7).to.be.equal(22);
    expect(result.field6).to.be.equal("11 end");
  });

  it("should let context decide replacement", function (): void {
    // arrange
    const obj = {
      field1: 1,
      field2: 1,
      field3: 1,
      field4: 1
    };
    const config = {
      field1: 2,
      field2: 2,
      field3: 2,
      field4: 2
    };
    const context = new TestContext(2);

    // act
    const result = compose(obj, config, context);

    // assert
    expect(result.field1).to.be.equal(2);
    expect(result.field2).to.be.equal(2);
    expect(result.field3).to.be.equal(1);
    expect(result.field4).to.be.equal(1);
  });
});
