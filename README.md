# Mina Testing Utils

⚠️ This todo is incomplete and not ready for use ⚠  ️

This repository contains a set of utilities for testing Mina zkapps:

- Custom jest matchers

# Installing

```bash
npm --save-dev install mina-jest-matchers #TODO
```

## Using Jest matchers

Import it in your tests as follows:

```typescript
// Impor to extend the matchers
import 'mina-jest-matchers';

describe('my test', () => {

  it('some test', async () => {

		// Matchers are automatically recognized by jest
    expect(Field(19)).toEqual(19);
    expect(app.someBooleanState).toBeFalse()
  })
```

You can refer to [contract.test.ts](./test/contract/test-contract.ts) for a running example.

## Using the interactive debugger

After installing the package, you can run the interactive debugger as follows:

```typescript 
import { Field, SmartContract, state, State, method } from 'snarkyjs';

/**
 * Basic Example
 * See https://docs.minaprotocol.com/zkapps for more info.
 *
 * The Add contract initializes the state variable 'num' to be a Field(1) value by default when deployed.
 * When the 'update' method is called, the Add contract adds Field(2) to its 'num' contract state.
 *
 * This file is safe to delete and replace with your own contract.
 */
export class Add extends SmartContract {
  @state(Field) num = State<Field>();

  init() {
    super.init();
    this.num.set(Field(1));
  }

  @method update() {
    const currentState = this.num.getAndAssertEquals();
    const newState = currentState.add(2);
    this.num.set(newState);
  }
}
```

```bash
❯ npx mina-testing-utils


 ███╗   ███╗ ██╗ ███╗   ██╗  █████╗      ████████╗ ███████╗ ███████╗ ████████╗ ██╗ ███╗   ██╗  ██████╗      ██╗   ██╗ ████████╗ ██╗ ██╗      ███████╗
 ████╗ ████║ ██║ ████╗  ██║ ██╔══██╗     ╚══██╔══╝ ██╔════╝ ██╔════╝ ╚══██╔══╝ ██║ ████╗  ██║ ██╔════╝      ██║   ██║ ╚══██╔══╝ ██║ ██║      ██╔════╝
 ██╔████╔██║ ██║ ██╔██╗ ██║ ███████║        ██║    █████╗   ███████╗    ██║    ██║ ██╔██╗ ██║ ██║  ███╗     ██║   ██║    ██║    ██║ ██║      ███████╗
 ██║╚██╔╝██║ ██║ ██║╚██╗██║ ██╔══██║        ██║    ██╔══╝   ╚════██║    ██║    ██║ ██║╚██╗██║ ██║   ██║     ██║   ██║    ██║    ██║ ██║      ╚════██║
 ██║ ╚═╝ ██║ ██║ ██║ ╚████║ ██║  ██║        ██║    ███████╗ ███████║    ██║    ██║ ██║ ╚████║ ╚██████╔╝     ╚██████╔╝    ██║    ██║ ███████╗ ███████║
 ╚═╝     ╚═╝ ╚═╝ ╚═╝  ╚═══╝ ╚═╝  ╚═╝        ╚═╝    ╚══════╝ ╚══════╝    ╚═╝    ╚═╝ ╚═╝  ╚═══╝  ╚═════╝       ╚═════╝     ╚═╝    ╚═╝ ╚══════╝ ╚══════╝



  

Please load the Mina REPL context by executing .loadMina before running any commands.


  
mina-testing-utils> .load
load      loadMina

mina-testing-utils> .loadMina
✔ Snarky loaded successfully! You can access it through the mina object.

mina-testing-utils> let { Add } = await import("/Users/alan.verbner/Projects/globant/mina/04-zkapp-browser-ui/contracts/build/src/Add.js")

mina-testing-utils> let { priv: zkAppPrivateKey, pub: zkAppAddress } = mina.genKeyPair();

mina-testing-utils> let zkApp = new Add(zkAppAddress);

mina-testing-utils> let { privateKey: deployerKey, publicKey: deployerAccount } = mina.testAccounts[0];

mina-testing-utils> let txn = await mina.snarkyjs.Mina.transaction(deployerAccount, () => {
  mina.snarkyjs.AccountUpdate.fundNewAccount(deployerAccount);
  zkApp.deploy();
});

mina-testing-utils> await txn.prove();
mina-testing-utils> await txn.sign([deployerKey, zkAppPrivateKey]).send();

mina-testing-utils> console.log("Stored number in state is: ", zkApp.num.get().toString())
Stored number in state is:  1
```

See it in action:

[![asciicast](https://asciinema.org/a/603288.svg)](https://asciinema.org/a/603288)

# Development

## Requirements

- `nodejs +18`

## Setup

```
npm install
```

## Testing

```
npm test
```

## Trying on a zkapp-cli local app

_Note: npm link seems to be messing around with snarkyjs import resulting in multiple errors therefore follow this steps in order to use a local version of this lib:_

```bash
# generate your zkapp as you would do normally, see https://docs.minaprotocol.com/zkapps/how-to-write-a-zkapp
zk example

# build the library
npm run build
# generate a tar file in any folder as pleased
npm run dev-pack -- --pack-destination /tmp/ 

# install the library in your zkapp
cd example && npm install --save-dev /tmp/mina-testing-utils-0.0.1.tgz
```
