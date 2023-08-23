import { expect } from "@jest/globals";
import { Field, PublicKey, Signature, State } from "snarkyjs";
import { extractFromState } from "../utils";

/**
 * Defines Jest matchers for signature.
 */
export default () => {
  expect.extend({
    /**
     * Checks if the actual value is equal to the expected signature value.
     * @template T - The type of the signature.
     * @param {T & State<T>} actual - The actual signature value to compare.
     * @param {Signature} value - The expected signature value to compare.
     * @returns {MatcherResult} - The result of the comparison.
     */
    toEqualSignature<T extends Signature>(actual: T & State<T>, value: Signature) {
      /* Check if actual is a State object */
      const toMatch: Signature = extractFromState(actual);

      if (!(toMatch instanceof Signature)) {
        return {
          message: () => `Expected ${actual} to be a Signature`,
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
     * Checks if the actual value is equal to the expected signature value.
     * @template T - The type of the signature.
     * @param {T & State<T>} actual - The actual signature value to compare.
     * @param {Signature} value - The expected signature value to compare.
     * @returns {MatcherResult} - The result of the comparison.
     */
    signerToBe<T extends Signature>(actual: T & State<T>, publicKey: PublicKey, msg: Field[]) {
        /* Check if actual is a State object */
        const toMatch: Signature = extractFromState(actual);

        if (!(toMatch instanceof Signature)) {
          return {
            message: () => `Expected ${actual} to be a Signature`,
            pass: false,
          };
        }
        const pass: boolean = toMatch.verify(publicKey, msg).toBoolean();
        const message = () => `Expected ${msg} to be signed by ${publicKey} and match ${actual}`;
        return {
          message,
          pass,
        };
      },
  });
};
