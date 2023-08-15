#!/usr/bin/env node --experimental-vm-modules --experimental-wasm-threads

const repl = require("repl");

/**
 * Generates a key pair using snarkyjs.
 * @param {Object} snarkyjs - The snarkyjs library.
 * @returns {Object} - An object containing the private and public keys.
 */
function genKeyPair(snarkyjs) {
  return () => {
    const priv = snarkyjs.PrivateKey.random();
    const pub = priv.toPublicKey();

    return {
      priv,
      pub,
    };
  };
}

/**
 * Dynamically imports a module from an absolute path.
 * @param {string} absolutePath - The absolute path of the module to import.
 * @returns {Promise} - A promise that resolves to the imported module.
 */
function dynamicImport(absolutePath) {
  return import(absolutePath);
}

// Start a REPL session with the given options.
const myREPL = repl.start({
  prompt: "mina-testing-utils> ",
  ignoreUndefined: true,
  replMode: repl.REPL_MODE_STRICT,
  require,
});

// Set the await flag to true in the REPL context.
myREPL.context.await = true;

// Add extra context to the REPL context.
const extraContext = {
  mina: {
    loadContractFromPath: dynamicImport,
  },
};
Object.assign(myREPL.context, extraContext);

// Define a custom command for the REPL.
myREPL.defineCommand("loadMina", {
  help: "Loads snarkyjs",
  action() {
    this.clearBufferedCommand();
    dynamicImport("snarkyjs").then((snarkyjs) => {
      const local = snarkyjs.Mina.LocalBlockchain({
        proofsEnabled: false,
      });
      snarkyjs.Mina.setActiveInstance(local);

      const minaContext = {
        snarkyjs,
        local,
        testAccounts: local.testAccounts,
        genKeyPair: genKeyPair(snarkyjs),
      };

      Object.assign(this.context.mina, minaContext);

      this.displayPrompt();
    });
  },
});
