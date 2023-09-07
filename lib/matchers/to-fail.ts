import { Mina } from "snarkyjs";
import { expect } from "@jest/globals";

function isPromise(p): p is Promise<unknown> {
  if (typeof p === 'object' && typeof p.then === 'function') {
    return true;
  }

  return false;
}

/**
 * TODO Docs
 */

export default () => {
  expect.extend({
    async toFailWithMessage(transaction: () => void | Promise<Mina.Transaction>, expectedError: string) {
      let result;
      try {
        if (isPromise(transaction)) await transaction;
        else transaction();
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
    async toFail(transaction: () => any) {
      let result;
      try {
        if (isPromise(transaction)) await transaction;
        else transaction();
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
