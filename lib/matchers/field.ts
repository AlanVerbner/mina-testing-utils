/**
 * This module exports a Jest matcher that extends the expect object with a custom matcher called "toEqual".
 * The "toEqual" matcher is used to compare two snarkyjs Field objects, or a Field object with a string or number.
 *
 * @packageDocumentation
 */
import { Field } from "snarkyjs";
import { expect } from "@jest/globals";

export default () => {
  expect.extend({
    toEqual(actual: Field, value: string | number | Field) {
      const parsed = Field.from(value);
      const pass: boolean = actual.equals(parsed).toBoolean();
      const message = () => `Expected ${actual} to equal ${value}`;
      return {
        message,
        pass,
      };
    },
  });
};
