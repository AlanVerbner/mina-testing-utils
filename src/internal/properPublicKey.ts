import { PublicKey } from "snarkyjs";

export function supportProperPublicKey(Assertion: Chai.AssertionStatic) {
    Assertion.addProperty("properPublicKey", function (this: any) {
      const obj = this._obj;
      this.assert(
        obj instanceof PublicKey,
        `Expected "${obj}" to be a proper PublicKey`,
        `Expected "${obj}" NOT to be a proper PublicKey`,
        "proper PublicKey (number up to 256 bits)",
        obj
      );
    });
  }
  