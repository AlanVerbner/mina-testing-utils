import { PublicKey } from "snarkyjs";

export function supportProperPublicKey(Assertion: Chai.AssertionStatic) {
  Assertion.addChainableMethod("publicKey", function (expectedPublicKey: PublicKey) {
    const publicKey = this._obj;
    this.assert(
      publicKey instanceof PublicKey && expectedPublicKey == publicKey,
      `Expected ${publicKey} to equal ${expectedPublicKey}`,
        `Expected ${publicKey} NOT to equal ${expectedPublicKey}`,
        "proper PublicKey (number up to 256 bits)",
        publicKey
    );
  }, function (this: any) {
    const publicKey = this._obj;
      this.assert(
        publicKey instanceof PublicKey,
        `Expected ${publicKey} to be a proper PublicKey`,
        `Expected ${publicKey} NOT to be a proper PublicKey`,
        "proper PublicKey (number up to 256 bits)",
        publicKey
      );
  })
}
  