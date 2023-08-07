import { PrivateKey } from "snarkyjs";

export function supportProperPrivateKey(Assertion: Chai.AssertionStatic) {
  Assertion.addChainableMethod("privateKey", function (expectedPrivateKey: PrivateKey) {
    const privateKey = this._obj;
    this.assert(
      privateKey instanceof PrivateKey && expectedPrivateKey == privateKey,
      `Expected ${privateKey} to equal ${expectedPrivateKey}`,
        `Expected ${privateKey} NOT to equal ${expectedPrivateKey}`,
        "proper PrivateKey (number up to 256 bits)",
        privateKey
    );
  }, function (this: any) {
    const privateKey = this._obj;
      this.assert(
        privateKey instanceof PrivateKey,
        `Expected ${privateKey} to be a proper PrivateKey`,
        `Expected ${privateKey} NOT to be a proper PrivateKey`,
        "proper PrivateKey (number up to 256 bits)",
        privateKey
      );
  })
}
  