import { AccountUpdate, Bool, Mina, PrivateKey, PublicKey } from "snarkyjs";
import { TestContract } from "../contract/test-contract";
import "../../lib/index";

describe("readState", () => {
  let zkApp: TestContract;
  let zkAppPrivateKey: PrivateKey;
  let zkAppAddress: PublicKey;
  let sender: PublicKey;
  let senderKey: PrivateKey;

  beforeEach(async () => {
    const Local = Mina.LocalBlockchain({ proofsEnabled: false });
    Mina.setActiveInstance(Local);
    sender = Local.testAccounts[0].publicKey;
    senderKey = Local.testAccounts[0].privateKey;
    zkAppPrivateKey = PrivateKey.random();
    zkAppAddress = zkAppPrivateKey.toPublicKey();
    zkApp = new TestContract(zkAppAddress);
  });

  it("should read a boolean state", async () => {
    await deploy(zkApp, zkAppPrivateKey, true, sender, senderKey);
    expect(zkApp.boolState).toEqualBool(true);
  });
});

async function deploy(
  zkApp: TestContract,
  zkAppPrivateKey: PrivateKey,
  bool: boolean,
  sender: PublicKey,
  senderKey: PrivateKey
) {
  const tx = await Mina.transaction(sender, () => {
    AccountUpdate.fundNewAccount(sender);
    zkApp.deploy();
    zkApp.update(Bool(bool));
  });
  await tx.prove();
  // this tx needs .sign(), because `deploy()` adds an account update that requires signature authorization
  await tx.sign([zkAppPrivateKey, senderKey]).send();
}
