const repl = require('repl');
const { Mina, PrivateKey } = require("snarkyjs");
// const { TestZkApp } = require("../src/contracts/test.mts");

let mina = Mina.LocalBlockchain({ proofsEnabled: false });
Mina.setActiveInstance(mina);
let sender = mina.testAccounts[0].publicKey;
let senderKey = mina.testAccounts[0].privateKey;
let zkAppPrivateKey = PrivateKey.random();
let zkAppAddress = zkAppPrivateKey.toPublicKey();

const predefinedVars = {
  mina,
  sender,
  senderKey,
  zkAppPrivateKey,
  zkAppAddress
};

// Start the REPL with the predefined variables
const myREPL = repl.start({
  prompt: 'mina > ',
  ignoreUndefined: true,
  replMode: repl.REPL_MODE_STRICT,
});

myREPL.defineCommand('compile', () => {
  // const c = TestZkApp.compile();
  // console.log("compiled: ", c);
  console.log("This command should aim to compile a specific contract or all contracts and display their constraints");
  myREPL.displayPrompt();
});

// Assign the predefined variables to the context of the REPL
Object.assign(myREPL.context, predefinedVars);