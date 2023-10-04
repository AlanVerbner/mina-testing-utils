import { AccountUpdate, Field, Mina as OriginalMina, PrivateKey, PublicKey } from "snarkyjs";
import { TestContract } from "./contract/test-contract";
import { createAsyncFixture } from "../lib/create-fixture"
import configFieldMatchers from "../lib/matchers/common-types";
configFieldMatchers();

let executionCounter: number;

const setupFunction = async (local, Mina) => {
  const sender = local.testAccounts[0].publicKey;
  const senderKey = local.testAccounts[0].privateKey;
  const zkAppPrivateKey = PrivateKey.random();
  const zkAppAddress = zkAppPrivateKey.toPublicKey();
  const zkApp = new TestContract(zkAppAddress);
  const tx = await Mina.transaction(sender, () => {
    AccountUpdate.fundNewAccount(sender);
    zkApp.deploy();
  });
  await tx.prove();
  await tx.sign([zkAppPrivateKey, senderKey]).send();


  executionCounter++;
  return {
    zkApp,
    sender,
    zkAppPrivateKey,
    senderKey
  };

};
describe("Fixture creation and usage", () => {
    describe("No fixture", () => {
      const setupTest = async () => {
        const local = OriginalMina.LocalBlockchain({ proofsEnabled: false });
        OriginalMina.setActiveInstance(local);

        const result = await setupFunction(local, OriginalMina);
        return { ...result, local, Mina: OriginalMina};
    }

      it("is NOT only executed once", async () => {
        executionCounter = 0;
        await setupTest();
        expect(executionCounter).toEqual(1);
        await setupTest();
        expect(executionCounter).toEqual(2);
      });
      it("results are independent", async () => {
        let zkApp: TestContract;
        let sender;
        let zkAppPrivateKey;
        let senderKey;
        let Mina;
        ({zkApp, zkAppPrivateKey, sender, senderKey, Mina } = await setupTest());

        const tx = await Mina.transaction(sender,() => {
          zkApp.setField(Field.from(10));
        });
        await tx.prove();
        await tx.sign([zkAppPrivateKey, senderKey]).send();
        expect(zkApp.fieldState.get()).toEqualField(10);
        ({ zkApp } = await setupTest());
        expect(zkApp.fieldState.get()).toEqualField(0);
      });
    });
    describe("Use createFixture", () => {
      const setupTest = createAsyncFixture(setupFunction);

      it("is only executed once", async () => {
        executionCounter = 0;
        await setupTest();
        expect(executionCounter).toEqual(1);
       await setupTest();
        expect(executionCounter).toEqual(1);
      });
      it("results are independent", async () => {
        let zkApp: TestContract;
        let sender;
        let zkAppPrivateKey;
        let senderKey;
        let Mina;        ({zkApp, zkAppPrivateKey, sender, senderKey, Mina } = await setupTest());
        zkApp.setField(Field.from(10));

        const tx = await Mina.transaction(sender,() => {
          zkApp.setField(Field.from(10));

        });
        await tx.prove();
        await tx.sign([zkAppPrivateKey, senderKey]).send();
        expect(zkApp.fieldState.get()).toEqualField(10);
        ({ zkApp } = await setupTest());
        expect(zkApp.fieldState.get()).toEqualField(0);
      });
    });
});

