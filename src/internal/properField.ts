import { Field } from "snarkyjs";

export function supportProperField(Assertion: Chai.AssertionStatic) {
    Assertion.addProperty("properField", function (this: any) {
      const obj = this._obj;
      this.assert(
        obj instanceof Field,
        `Expected "${obj}" to be a proper Field`,
        `Expected "${obj}" NOT to be a proper Field`,
        "proper Field (number up to 256 bits)",
        obj
      );
    });
  }
  