import { SmartContract, fetchEvents } from "snarkyjs";

export function supportEmit(
    Assertion: Chai.AssertionStatic,
    chaiUtils: Chai.ChaiUtils
  ) {
    Assertion.addMethod(
      "emit",
      async function (this: any, contract: SmartContract, eventName: string) {
        const fetchedEvents = await fetchEvents({publicKey: contract.address.toString()});
        console.log(eventName);
        console.log(fetchedEvents);
      }
    );
  }