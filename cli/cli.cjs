#!/usr/bin/env node --experimental-vm-modules --experimental-wasm-threads

const chalk = require("chalk");
const { printBanner } = require("./gui.cjs");
const configureRepl = require("./repl.cjs");

printBanner();

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
configureRepl(dynamicImport, genKeyPair);
