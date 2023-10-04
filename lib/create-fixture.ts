import { Mina } from "snarkyjs";
import clone from "clone";


export function createAsyncFixture(fn: any) {
    let originalResult;
    let originalLocal;
    let called = false;

    return async () => {
        if (!called) {
                originalLocal = Mina.LocalBlockchain({ proofsEnabled: false });
                Mina.setActiveInstance(originalLocal);
                originalResult = await fn(originalLocal, Mina);
                called = true;
        }
        const copiedLocal = clone(originalLocal);
        Mina.setActiveInstance(copiedLocal);

        return { ...clone(originalResult), local: copiedLocal, Mina};
    }
}
