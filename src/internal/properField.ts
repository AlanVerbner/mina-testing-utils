import { Field } from "snarkyjs";

export function supportProperField(Assertion: Chai.AssertionStatic) {
  Assertion.addChainableMethod("field", function (expectedField: Field) {
    const field = this._obj;
    this.assert(
      field instanceof Field && expectedField == field,
      `Expected ${field} to equal ${expectedField}`,
        `Expected ${field} NOT to equal ${expectedField}`,
        "proper Field (number up to 256 bits)",
        field
    );
  }, function (this: any) {
    const field = this._obj;
      this.assert(
        field instanceof Field,
        `Expected ${field} to be a proper Field`,
        `Expected ${field} NOT to be a proper Field`,
        "proper Field (number up to 256 bits)",
        field
      );
  })
}
  