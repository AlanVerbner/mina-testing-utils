import { Bool } from "snarkyjs";
import { expect } from "@jest/globals";

/**
 * FILEPATH: /Users/alan.verbner/Projects/globant/mina/mina-jest-matchers/lib/matchers/bool.ts
 *
 * Defines Jest matchers for boolean values.
 *
 * @remarks
 * This module exports a default function that extends Jest's `expect` object with custom matchers:
 * - `toBeTrue`: checks if the given boolean value is true and avoids invoking .toBoolean()
 * - `toBeFalse`: checks if the given boolean value is false and avoid invoking .toBoolean()
 *
 * @packageDocumentation
 */

const doMatch = (actual: Bool, expected: boolean) => {
  if (!(actual instanceof Bool))
    return {
      message: () => `Expected ${actual} to be a Bool`,
      pass: false,
    };
  return {
    message: () => `Expected ${actual} to be ${expected}`,
    pass: actual.toBoolean() === expected,
  };
};

export default () => {
  expect.extend({
    toBeTrue(actual: Bool) {
      return doMatch(actual, true);
    },
    toBeFalse(actual: Bool) {
      return doMatch(actual, false);
    },
  });
};
