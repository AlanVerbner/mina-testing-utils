import { Bool } from "snarkyjs";
import { expect } from "@jest/globals";

/**
 * TODO Docs
 */

export default () => {
  expect.extend({
    toFailWithMessage(transaction: () => any, expectedError: string) {
      let result;
      try {
        transaction();
        result = {error: false, message: ""};
      } catch (e) {
        result = {error: true, message: e.message.split('\n')[0]};
      }
        const base = `Expected transaction to fail with message ${expectedError}`;
        const suffix = result.error ? ` but it failed with ${result.message}` :  ` but it didn't fail`;

      return {
          pass: result.error && result.message === expectedError,
          message: () => `${base}${suffix}`
      };
    },
    toFail(transaction: () => any) {
      let result;
      try {
        transaction();
        result = {error: false};
      } catch (e) {
        result = {error: true};
      }
        const message = "Expected transaction to fail with message but it didn't fail";

        return {
          pass: result.error ,
          message: () => message
      };
    },
  });
};
