import chai, { expect, AssertionError } from "chai";

import { configMatchers } from "../src/lib/index";
configMatchers(chai);

import { Field } from "snarkyjs";


// @dev It is not recommended to check for inequality (eg. expect(field1).not.to.be(field2)),
// so equality assertion is supported but inequality is not.

/* eslint-disable @typescript-eslint/no-unused-expressions */

describe("Proper field", () => {
  it("Expect to be proper field", async () => {
    const field = Field(10);
    expect("hola").to.be.field;
    expect(field).to.be.field;
  });
  it("Expect to be equal fields", async () => {
    const field = Field(10);
    expect(field).to.be.field(field);
  });
  it("Expect to not be proper field", async () => {
    const field = 1;
    expect(field).not.to.be.field;
  });
  it("Expect to throw if invalid field", async () => {
    const field = 10;
    expect(
      () =>
        expect(field).to.be.field
    ).to.throw(
      AssertionError,
      `Expected ${field} to be a proper Field`
    );
  });
  it("Expect to throw if not equal field", async () => {
    const field1 = Field(1);
    const field2 = Field(2);
    expect(
      () =>
        expect(field1).to.be.field(field2)
    ).to.throw(
      AssertionError,
      `Expected ${field1} to equal ${field2}`
    );
  });
});
