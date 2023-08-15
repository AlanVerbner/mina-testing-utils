import { expect } from "@jest/globals";
import { Bool, Field, State } from "snarkyjs";
import { BoolLike, FieldLike } from "../types";

/**
 * Extracts a value from a state object or returns the value itself if it's not a state object.
 * @param val - The value to extract from.
 * @returns The extracted value.
 */
function extractFromState<T extends BoolLike | FieldLike>(
  val: T & State<T>
): T {
  return val.get ? val.get() : val;
}

/**
 * Defines Jest matchers for common types.
 */
export default () => {
  expect.extend({
    /**
     * Checks if the actual value is equal to the expected boolean value.
     * @template T - The type of the boolean.
     * @param {T & State<T>} actual - The actual boolean value to compare.
     * @param {BoolLike} value - The expected boolean value to compare.
     * @returns {MatcherResult} - The result of the comparison.
     */
    toEqualBool<T extends Bool>(actual: T & State<T>, value: BoolLike) {
      /* Check if actual is a State object */
      const toMatch: Bool = extractFromState(actual);

      if (!(toMatch instanceof Bool)) {
        return {
          message: () => `Expected ${actual} to be a Bool`,
          pass: false,
        };
      }
      const pass: boolean = toMatch.toBoolean() === (Bool(value)).toBoolean();
      const message = () => `Expected ${actual} to equal ${value}`;
      return {
        message,
        pass,
      };
    },
    /**
     * Checks if the actual value is equal to the expected value for a given field.
     * @template T - The type of the field.
     * @param {T & State<T>} actual - The actual field value to compare.
     * @param {FieldLike} value - The expected field value to compare.
     * @returns {MatcherResult} - The result of the comparison.
     */
    toEqualField<T extends Field>(actual: T & State<T>, value: FieldLike) {
      /* Check if actual is a State object */
      const toMatch: Field = extractFromState(actual);

      if (!(toMatch instanceof Field)) {
        return {
          message: () => `Expected ${actual} to be a Field`,
          pass: false,
        };
      }

      const pass: boolean = toMatch.equals(Field.from(value)).toBoolean();
      const message = () => `Expected ${actual} to equal ${value}`;
      return {
        message,
        pass,
      };
    },
  });
};
