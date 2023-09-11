import { Bool, SmartContract, State, UInt64, method, state } from "snarkyjs";

class TestContract extends SmartContract {
  @state(Bool) boolState = State<Bool>();

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
}

export { TestContract };
