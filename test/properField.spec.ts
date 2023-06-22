import { expect, AssertionError } from "chai";

import "../src/internal/add-chai-matchers";
import { Field } from "snarkyjs";

/* eslint-disable @typescript-eslint/no-unused-expressions */

describe.only("Proper address", () => {
  it("Expect to be proper address", async () => {
    const field = new Field(2);
    expect(field).to.be.properField;
  });

//   it("Expect not to be proper address", async () => {
//     expect("28FAA621c3348823D6c6548981a19716bcDc740e").not.to.be.properField;
//     expect("0x28FAA621c3348823D6c6548981a19716bcDc740").to.not.be.properField;
//     expect("0x846C66cf71C43f80403B51fE3906B3599D63336g").to.not.be
//       .properField;
//     expect("0x846C66cf71C43f80403B51fE3906B3599D6333-f").to.not.be
//       .properField;
//   });

//   it("Expect to throw if invalid address", async () => {
//     expect(
//       () =>
//         expect("0x28FAA621c3348823D6c6548981a19716bcDc740").to.be.properField
//     ).to.throw(
//       AssertionError,
//       'Expected "0x28FAA621c3348823D6c6548981a19716bcDc740" to be a proper address'
//     );
//   });

//   it("Expect to throw if negation with proper address)", async () => {
//     expect(
//       () =>
//         expect("0x28FAA621c3348823D6c6548981a19716bcDc740e").not.to.be
//           .properField
//     ).to.throw(
//       AssertionError,
//       'Expected "0x28FAA621c3348823D6c6548981a19716bcDc740e" NOT to be a proper address'
//     );
//   });
});
