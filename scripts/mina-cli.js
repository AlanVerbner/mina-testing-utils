const repl = require('repl');
const { Mina, PrivateKey } = require("snarkyjs");

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

// Assign the predefined variables to the context of the REPL
Object.assign(myREPL.context, predefinedVars);