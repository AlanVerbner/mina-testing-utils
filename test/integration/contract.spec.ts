import { AccountUpdate, Bool, Field, Mina, PrivateKey, PublicKey, UInt64 } from "snarkyjs";
import { TestContract } from "../contract/test-contract";
import "../../lib/index";
import { parseMina } from "../../lib/utils";

describe.only("readState", () => {
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

  it("should revert with custom message if it fails an assertion", async () => {
    await deploy(zkApp, zkAppPrivateKey, true, sender, senderKey);
    return expect(() => zkApp.failIfFalse(Bool(false))).toFailWithMessage("custom error message");
  });

  it("should revert if it fails an assertion", async () => {
    await deploy(zkApp, zkAppPrivateKey, true, sender, senderKey);
    return expect(() => zkApp.failIfFalse(Bool(false))).toFail();
  });

  it("should not revert with custom message if it does not fail an assertion", async () => {
    await deploy(zkApp, zkAppPrivateKey, true, sender, senderKey);
    return expect(() => zkApp.failIfFalse(Bool(true))).not.toFailWithMessage("custom error message");
  });

  it("should not revert if it does not fail an assertion", async () => {
    await deploy(zkApp, zkAppPrivateKey, true, sender, senderKey);
    return expect(() => zkApp.failIfFalse(Bool(true))).not.toFail();
  });

  it("should revert with custom message if it fails an assertion", async () => {
    await deploy(zkApp, zkAppPrivateKey, true, sender, senderKey);
    return expect(Mina.transaction(sender,() => zkApp.failIfFalse(Bool(false)))).toFailWithMessage("custom error message");
  });

  it("should revert if it fails an assertion", async () => {
    await deploy(zkApp, zkAppPrivateKey, true, sender, senderKey);
    return expect(Mina.transaction(sender,() => zkApp.failIfFalse(Bool(false)))).toFail();
  });

  it("should not revert with custom message if it does not fail an assertion", async () => {
    await deploy(zkApp, zkAppPrivateKey, true, sender, senderKey);
    return expect(Mina.transaction(sender,() => zkApp.failIfFalse(Bool(true)))).not.toFailWithMessage("custom error message");
  });

  it("should not revert if it does not fail an assertion", async () => {
    await deploy(zkApp, zkAppPrivateKey, true, sender, senderKey);
    return expect(Mina.transaction(sender,() => zkApp.failIfFalse(Bool(true)))).not.toFail();
  });

  it("should not change balance with a simple transaction", async () => {
    await deploy(zkApp, zkAppPrivateKey, true, sender, senderKey);
    return expect(await Mina.transaction(sender,() => zkApp.failIfFalse(Bool(true)))).toKeepBalanceUnchanged(zkApp.address, 1);
  });

  it("should change balance of mina with a simple transfer", async () => {
    await deploy(zkApp, zkAppPrivateKey, true, sender, senderKey);
    return expect(await Mina.transaction(sender,() =>
    {
      AccountUpdate.fundNewAccount(sender, 10)
      zkApp.failIfFalse(Bool(true));
    })).toDecreaseBalance(sender, 1, parseMina(10));
  });

  it("should change balance of mina with a simple transfer from contract", async () => {
    await deploy(zkApp, zkAppPrivateKey, true, sender, senderKey);
    const tx = await Mina.transaction(sender,() =>
    {
      zkApp.payout(UInt64.from(10));
    });
    expect(tx).toIncreaseBalance(sender, 1, 10);
    return expect(tx).toDecreaseBalance(zkApp.address, 1, 10);
  });

  it("should change balance of mina with a contract call that makes two sends", async () => {
    await deploy(zkApp, zkAppPrivateKey, true, sender, senderKey);
    const tx = await Mina.transaction(sender,() =>
    {
      zkApp.payoutTwice(UInt64.from(10));
    });
    expect(tx).toIncreaseBalance(sender, 1, 20);
    return expect(tx).toDecreaseBalance(zkApp.address, 1, 20);
  });

  it("should change balance of mina with a contract call that makes two sends and a simple transfer", async () => {
    await deploy(zkApp, zkAppPrivateKey, true, sender, senderKey);
    const tx = await Mina.transaction(sender,() =>
    {
      zkApp.payoutTwice(UInt64.from(parseMina(10)));
      AccountUpdate.fundNewAccount(sender, 10)
    });
    expect(tx).toIncreaseBalance(sender, 1, parseMina(10));
    return expect(tx).toDecreaseBalance(zkApp.address, 1, parseMina(20));
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
