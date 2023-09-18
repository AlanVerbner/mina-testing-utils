import { Bool, Field, PublicKey, SmartContract, State, UInt64, method, provablePure, state } from "snarkyjs";

class TestContract extends SmartContract {
  @state(Bool) boolState = State<Bool>();

  events = {
    simpleEvent: PublicKey,
    complexEvent: provablePure({
      publicKey: PublicKey,
      field: Field,
      bool: Bool,
      uint64: UInt64,
    }),
  };

  @method init() {
    super.init();
    this.boolState.set(Bool(true));
  }

  @method update(value: Bool) {
    this.boolState.set(value);
  }

  @method failIfFalse(value: Bool) {
    value.assertEquals(true, "custom error message");
  }

  @method payout(amount: UInt64) {
    this.send({ to: this.sender, amount });
  }

  @method payoutTwice(amount: UInt64) {
    this.send({ to: this.sender, amount }); // Purposedly doing it twice to check if it detects them
    this.send({ to: this.sender, amount });
  }

  @method eventEmittingMethod() {
    this.emitEvent('simpleEvent', this.sender);
  }

  @method complexEventEmittingMethod() {
    this.emitEvent('complexEvent', {
      publicKey: this.sender,
      field: Field.from(0),
      bool: Bool(true),
      uint64: UInt64.from(0),
    });
  }
}

export { TestContract };
