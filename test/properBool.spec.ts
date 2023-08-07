import chai, { expect, AssertionError } from "chai";

import { configMatchers } from "../src/lib/index";
configMatchers(chai);

import { Bool, Field } from "snarkyjs";

// @dev It is not recommended to check for inequality (eg. expect(bool1).not.to.be(bool2)),
// so equality assertion is supported but inequality is not.

/* eslint-disable @typescript-eslint/no-unused-expressions */


describe.skip("Proper bool", () => {
  it("Expect to be proper bool", async () => {
    const bool = new Bool(true);
    console.log("is bool field?", bool instanceof Field);
    expect(bool).to.be.bool;
  });
  it("Expect to be equal bools", async () => {
    const bool = Bool(true);
    expect(bool).to.be.bool(bool);
  });
  it("Expect to not be proper bool", async () => {
    const bool = 1;
    expect(bool).not.to.be.bool;
  });
  it("Expect to throw if invalid bool", async () => {
    const bool = 10;
    expect(() => expect(bool).to.be.bool).to.throw(
      AssertionError,
      `Expected ${bool} to be a proper Bool`
    );
  });
  it("Expect to throw if not equal bool", async () => {
    const bool1 = Bool(true);
    const bool2 = Bool(false);
    expect(() => expect(bool1).to.be.bool(bool2)).to.throw(
      AssertionError,
      `Expected ${bool1} to equal ${bool2}`
    );
  });
});
