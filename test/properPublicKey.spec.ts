import chai, { expect, AssertionError } from "chai";

import { configMatchers } from "../src/lib/index";
configMatchers(chai);

import { PublicKey } from "snarkyjs";

// @dev It is not recommended to check for inequality (eg. expect(publicKey1).not.to.be(publicKey2)),
// so equality assertion is supported but inequality is not.

/* eslint-disable @typescript-eslint/no-unused-expressions */

describe("Proper publicKey", () => {
  it("Expect to be proper publicKey", async () => {
    const publicKey = new PublicKey();
    expect(publicKey).to.be.publicKey;
  });
  it("Expect to be equal publicKeys", async () => {
    const publicKey = new PublicKey();
    expect(publicKey).to.be.publicKey(publicKey);
  });
  it("Expect to not be proper publicKey", async () => {
    const publicKey = 1;
    expect(publicKey).not.to.be.publicKey;
  });
  it("Expect to throw if invalid publicKey", async () => {
    const publicKey = 10;
    expect(
      () =>
        expect(publicKey).to.be.publicKey
    ).to.throw(
      AssertionError,
      `Expected ${publicKey} to be a proper PublicKey`
    );
  });
  it("Expect to throw if not equal publicKey", async () => {
    const publicKey1 = new PublicKey();
    const publicKey2 = new PublicKey();
    expect(
      () =>
        expect(publicKey1).to.be.publicKey(publicKey2)
    ).to.throw(
      AssertionError,
      `Expected ${publicKey1} to equal ${publicKey2}`
    );
  });
});
