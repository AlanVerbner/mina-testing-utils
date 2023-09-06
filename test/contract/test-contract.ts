import { Bool, SmartContract, State, method, state } from "snarkyjs";

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
}

export { TestContract };
