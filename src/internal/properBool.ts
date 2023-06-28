import { Bool } from "snarkyjs";

export function supportProperBool(Assertion: Chai.AssertionStatic) {
  Assertion.addChainableMethod("bool", function (expectedBool: Bool) {
    // const bool = this._obj;
    // this.assert(
    //   bool instanceof Bool && expectedBool == bool,
    //   `Expected ${bool} to equal ${expectedBool}`,
    //     `Expected ${bool} NOT to equal ${expectedBool}`,
    //     "proper Bool (number up to 256 bits)",
    //     bool
    // );
  }, function (this: any) {
    const bool = this._obj;
    console.log(bool == Bool(true));
      this.assert(
        this._obj instanceof Bool,
        `Expected provided value to be a proper Bool`,
        `Expected provided value NOT to be a proper Bool`,
        "proper Bool (number up to 256 bits)",
        bool
      );
  })
}
  