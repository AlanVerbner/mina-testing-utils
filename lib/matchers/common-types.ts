import { expect } from "@jest/globals";
import { Bool, Field, PublicKey, Int64, State, UInt64, UInt32 } from "o1js";
import { BoolLike, FieldLike, Int64Like, UInt32Like, UInt64Like } from "../types";
import { matchesField } from "../utils";

/**
 * Extracts a value from a state object or returns the value itself if it's not a state object.
 * @param val - The value to extract from.
 * @returns The extracted value.
 */
function extractFromState<T extends BoolLike | FieldLike | PublicKey | Int64Like>(
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

      const pass: boolean = matchesField(value, toMatch);

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
     * @param {PublicKey} value - The expected field value to compare.
     * @returns {MatcherResult} - The result of the comparison.
     */
    toEqualPublicKey<T extends PublicKey>(actual: T & State<T>, value: PublicKey) {
      /* Check if actual is a State object */
      const toMatch: PublicKey = extractFromState(actual);

      if (!(toMatch instanceof PublicKey)) {
        return {
          message: () => `Expected ${actual} to be a PublicKey`,
          pass: false,
        };
      }

      const pass: boolean = toMatch.equals(value).toBoolean();
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
     * @param {Int64Like} value - The expected field value to compare.
     * @returns {MatcherResult} - The result of the comparison.
     */
    toEqualInt64<T extends Int64>(actual: T & State<T>, value: Int64Like) {
      /* Check if actual is a State object */
      const toMatch: Int64 = extractFromState(actual);

      if (!(toMatch instanceof Int64)) {
        return {
          message: () => `Expected ${actual} to be a Int64`,
          pass: false,
        };
      }

      const pass: boolean = toMatch.equals(Int64.from(value)).toBoolean();
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
     * @param {UInt64Like} value - The expected field value to compare.
     * @returns {MatcherResult} - The result of the comparison.
     */
    toEqualUInt64<T extends UInt64>(actual: T & State<T>, value: UInt64Like) {
      /* Check if actual is a State object */
      const toMatch: UInt64 = extractFromState(actual);

      if (!(toMatch instanceof UInt64)) {
        return {
          message: () => `Expected ${actual} to be a UInt64`,
          pass: false,
        };
      }

      const pass: boolean = toMatch.equals(UInt64.from(value)).toBoolean();
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
     * @param {UInt32Like} value - The expected field value to compare.
     * @returns {MatcherResult} - The result of the comparison.
     */
    toEqualUInt32<T extends UInt32>(actual: T & State<T>, value: UInt32Like) {
      /* Check if actual is a State object */
      const toMatch: UInt32 = extractFromState(actual);

      if (!(toMatch instanceof UInt32)) {
        return {
          message: () => `Expected ${actual} to be a UInt32`,
          pass: false,
        };
      }

      const pass: boolean = toMatch.equals(UInt32.from(value)).toBoolean();
      const message = () => `Expected ${actual} to equal ${value}`;
      return {
        message,
        pass,
      };
    },
  });
};
