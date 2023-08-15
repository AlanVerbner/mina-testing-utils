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
