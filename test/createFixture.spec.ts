import { expect, AssertionError } from "chai";

import "../src/internal/add-chai-matchers";
import { AccountUpdate, Field, Mina, PrivateKey, PublicKey } from "snarkyjs";
import { TestZkApp } from "../src/contracts/test";
import { createFixture } from "../src/internal/create-fixture"

// @dev It is not recommended to check for inequality (eg. expect(field1).not.to.be(field2)),
// so equality assertion is supported but inequality is not.

/* eslint-disable @typescript-eslint/no-unused-expressions */
describe("Fixture creation and usage", () => {
    describe("No fixture", () => {
        let zkApp: TestZkApp,
        zkAppPrivateKey: PrivateKey,
        zkAppAddress: PublicKey,
        sender: PublicKey,
        senderKey: PrivateKey;
    
        let executionCounter = 0;
    
        beforeEach(async () => {
            let Local = Mina.LocalBlockchain({ proofsEnabled: false });
            Mina.setActiveInstance(Local);
            sender = Local.testAccounts[0].publicKey;
            senderKey = Local.testAccounts[0].privateKey;
            zkAppPrivateKey = PrivateKey.random();
            zkAppAddress = zkAppPrivateKey.toPublicKey();
            zkApp = new TestZkApp(zkAppAddress);
            executionCounter++;
          });
    
      it("First test", async () => {
        expect(executionCounter).to.equal(1);
      });
      it("Second test", async () => {
        expect(executionCounter).to.equal(2);
      });
      it("Third test", async () => {
        expect(executionCounter).to.equal(3);
      });
    });
    describe("Use createFixture", () => {
        let zkApp: TestZkApp,
        zkAppPrivateKey: PrivateKey,
        zkAppAddress: PublicKey,
        sender: PublicKey,
        senderKey: PrivateKey;
    
        let executionCounter = 0;

        const setupTest = createFixture(async () => {
            let Local = Mina.LocalBlockchain({ proofsEnabled: false });
            Mina.setActiveInstance(Local);
            sender = Local.testAccounts[0].publicKey;
            senderKey = Local.testAccounts[0].privateKey;
            zkAppPrivateKey = PrivateKey.random();
            zkAppAddress = zkAppPrivateKey.toPublicKey();
            zkApp = new TestZkApp(zkAppAddress);
            executionCounter++;
          });
    
        beforeEach(() => {
            setupTest();
        });
    
      it("First test", async () => {
        expect(executionCounter).to.equal(1);
      });
      it("Second test", async () => {
        expect(executionCounter).to.equal(1);
      });
      it("Third test", async () => {
        expect(executionCounter).to.equal(1);
      });
    });
});

