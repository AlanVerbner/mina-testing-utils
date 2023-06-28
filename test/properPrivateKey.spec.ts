import { expect, AssertionError } from "chai";

import "../src/internal/add-chai-matchers";
import { PrivateKey } from "snarkyjs";

// @dev It is not recommended to check for inequality (eg. expect(privateKey1).not.to.be(privateKey2)),
// so equality assertion is supported but inequality is not.

/* eslint-disable @typescript-eslint/no-unused-expressions */

describe("Proper privateKey", () => {
  it("Expect to be proper privateKey", async () => {
    const privateKey = PrivateKey.random();
    expect(privateKey).to.be.privateKey;
  });
  it("Expect to be equal privateKeys", async () => {
    const privateKey = PrivateKey.random();
    expect(privateKey).to.be.privateKey(privateKey);
  });
  it("Expect to not be proper privateKey", async () => {
    const privateKey = 1;
    expect(privateKey).not.to.be.privateKey;
  });
  it("Expect to throw if invalid privateKey", async () => {
    const privateKey = 10;
    expect(
      () =>
        expect(privateKey).to.be.privateKey
    ).to.throw(
      AssertionError,
      `Expected ${privateKey} to be a proper PrivateKey`
    );
  });
  it("Expect to throw if not equal privateKey", async () => {
    const privateKey1 = PrivateKey.random();
    const privateKey2 = PrivateKey.random();
    expect(
      () =>
        expect(privateKey1).to.be.privateKey(privateKey2)
    ).to.throw(
      AssertionError,
      `Expected ${privateKey1} to equal ${privateKey2}`
    );
  });
});
