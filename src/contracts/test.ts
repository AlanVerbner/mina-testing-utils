import {
    Field,
    SmartContract,
    State,
    method,
    state,
} from 'snarkyjs';

export { TestZkApp };

class TestZkApp extends SmartContract {

    events = {
        "test-event": Field,
    };
    /**
     * by making this a `@method`, we ensure that a proof is created for the state initialization.
     * alternatively (and, more efficiently), we could have used `super.init()` inside `update()` below,
     * to ensure the entire state is overwritten.
     * however, it's good to have an example which tests the CLI's ability to handle init() decorated with `@method`.
     */
    @method init() {
        this.emitEvent("test-event", Field(22));
        super.init();
    }

    @method eventEmitter(f: Field) {
        this.emitEvent("test-event", f);
    }
}
