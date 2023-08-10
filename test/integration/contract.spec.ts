import { AccountUpdate, Bool, Mina, PrivateKey, PublicKey } from "snarkyjs";
import { TestContract } from "../contract/test-contract";
import "../../lib/index";

describe("readState", () => {
  let zkApp: TestContract,
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
    zkApp = new TestContract(zkAppAddress);
  });

  it("should read a boolean state", async () => {
    await deploy(zkApp, zkAppPrivateKey, true, sender, senderKey);
    expect(zkApp.boolState.get()).toBeTrue();
  });
});

async function deploy(
  zkApp: TestContract,
  zkAppPrivateKey: PrivateKey,
  bool: boolean,
  sender: PublicKey,
  senderKey: PrivateKey
) {
  let tx = await Mina.transaction(sender, () => {
    AccountUpdate.fundNewAccount(sender);
    zkApp.deploy();
    zkApp.update(Bool(bool));
  });
  await tx.prove();
  // this tx needs .sign(), because `deploy()` adds an account update that requires signature authorization
  await tx.sign([zkAppPrivateKey, senderKey]).send();
}
