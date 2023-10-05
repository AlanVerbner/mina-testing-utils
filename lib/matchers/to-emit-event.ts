import { Bool, Mina, Provable, ProvablePure, PublicKey, SmartContract, UInt32 } from "o1js";
import { expect } from "@jest/globals";

const dataToString = (data: any): string => {
  if (data.toBase58) return data.toBase58();
  return data.toString()
}
const eventToString = (eventArgs: any) => {

  if (eventArgs.equals) return eventArgs.toString();
  const keys =Object.keys(eventArgs);

  return JSON.stringify(keys.reduce((o, key) => Object.assign(o, {[key]: dataToString(eventArgs[key])}), {}));
}

const argsMatch = (expectedArgs: any, actualArgs: any): boolean => {

  if (actualArgs.equals) return actualArgs.equals(expectedArgs).toBoolean();
  const results = Object.keys(actualArgs).map(key => {
    return actualArgs[key].equals(expectedArgs[key]).toBoolean()
  });

  return results.every(r => r);
}


/**
 * Defines Jest matchers for common types.
 */
export default () => {
  expect.extend({
    /**
     * Checks if the smart contract emitted an event in its entire history with the expected type and args
     * @param {SmartContract} zkApp - Smart contract that should emit the event
     * @param {string} type - Name of the type of the event
     * @param {any} args - Args expected in the event
     * @returns {MatcherResult} - The result of the matcher.
     */
    async toEmitEvent(zkApp: SmartContract, type: string, args: any) {
        const events = await zkApp.fetchEvents(UInt32.from(0));
        const foundEvent = events.find(e => e.type === type && argsMatch(args, e.event.data));
        return {
          pass: foundEvent !== undefined,
          message: () => `Expected to find event of type "${type}" and args ${eventToString(args)} but it was not found`
        }
    },
  });
};
