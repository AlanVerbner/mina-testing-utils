import { expect, AssertionError } from "chai";

import "../src/internal/add-chai-matchers";
import { AccountUpdate, Field, Mina, PrivateKey, PublicKey, shutdown } from "snarkyjs";
import { TestZkApp } from "../src/contracts/test";

// @dev It is not recommended to check for inequality (eg. expect(field1).not.to.be(field2)),
// so equality assertion is supported but inequality is not.

/* eslint-disable @typescript-eslint/no-unused-expressions */

describe("Emit event", () => {
    let zkApp: TestZkApp,
    zkAppPrivateKey: PrivateKey,
    zkAppAddress: PublicKey,
    sender: PublicKey,
    senderKey: PrivateKey;

    beforeEach(async () => {
        let Local = Mina.LocalBlockchain({ proofsEnabled: false });
        Mina.setActiveInstance(Local);
        sender = Local.testAccounts[0].publicKey;
        senderKey = Local.testAccounts[0].privateKey;
        zkAppPrivateKey = PrivateKey.random();
        zkAppAddress = zkAppPrivateKey.toPublicKey();
        zkApp = new TestZkApp(zkAppAddress);
      });

  it.only("Expect to emit event", async () => {
    await deploy(zkApp, zkAppPrivateKey, sender, senderKey);
    console.log("Deployed. Calling eventEmitter...");
    let tx = await Mina.transaction(sender, async () => {
        zkApp.eventEmitter(Field(10));
      });
    await tx.prove();
    await tx.sign([senderKey]).send();
    console.log("Emitter called!");
    // console.log("TRANSACTIONS", tx.toPretty());
    console.log("TRANSACTIONS", tx.transaction);
    let events = await zkApp.fetchEvents();
    console.log("EVENTS_0", events[0].event.data.toString());
    console.log("EVENTS_1", events[1].event.data.toString());
    const nwState = await Mina.getNetworkState();
    console.log("NETWORK STATE: ",nwState.blockchainLength.toString());
    // under the assumption that there's only one block per transaction => wrong assumption
    tx = await Mina.transaction(sender, async () => {
        zkApp.eventEmitter(Field(20));
      });
    await tx.prove();
    await tx.sign([senderKey]).send();
    events = await zkApp.fetchEvents();
    console.log("EVENTS_2", events[2].blockHeight);
  });
});

async function deploy(
    zkApp: TestZkApp,
    zkAppPrivateKey: PrivateKey,
    sender: PublicKey,
    senderKey: PrivateKey
  ) {
    let tx = await Mina.transaction(sender, () => {
      AccountUpdate.fundNewAccount(sender);
      zkApp.deploy();
    //   zkApp.update(Sudoku.from(sudoku));
    });
    await tx.prove();
    // this tx needs .sign(), because `deploy()` adds an account update that requires signature authorization
    await tx.sign([zkAppPrivateKey, senderKey]).send();
  }
