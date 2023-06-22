import { Bool } from "snarkyjs";

export function supportProperBool(Assertion: Chai.AssertionStatic) {
    Assertion.addProperty("properBool", function (this: any) {
      const obj = this._obj;
      this.assert(
        obj instanceof Bool,
        `Expected "${obj}" to be a proper Bool`,
        `Expected "${obj}" NOT to be a proper Bool`,
        "proper Bool (number up to 256 bits)",
        obj
      );
    });
  }
  