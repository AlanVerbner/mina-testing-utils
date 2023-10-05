const repl = require("repl");
const Spinnies = require("spinnies");
const homedir = require("os").homedir();
const spinnies = new Spinnies();

const { printLoadMinaErrorMsg, minaLoadedOkMsg } = require("./gui.cjs");

function configureRepl(dynamicImport, genKeyPair) {
  // Start a REPL session with the given options.
  const REPL = repl.start({
    prompt: "mina-testing-utils> ",
    ignoreUndefined: true,
    replMode: repl.REPL_MODE_STRICT,
    require,
  });

  // Set command history file.
  REPL.setupHistory(`${homedir}/.mina-testing-utils-history`, (err) => {
    if (err) console.warn("Repl history could not be loaded.");
  });

  // Set the await flag to true in the REPL context.
  REPL.context.await = true;
  // Add extra context to the REPL context.
  const extraContext = {
    mina: {
      loadContractFromPath: dynamicImport,
    },
  };
  Object.assign(REPL.context, extraContext);

  // Override the eval function to print a message if the user tries to run a command before loading the Mina context.
  const evalFn = REPL.eval;
  REPL.eval = (cmd, context, filename, callback) => {
    printLoadMinaErrorMsg();
    evalFn(cmd, context, filename, (err, result) => {
      if (err) {
        callback(err);
      } else {
        if (result instanceof Promise) {
          result.then((res) => {
            callback(null, res);
          });
        } else {
          callback(null, result);
        }
      }
    });
  };
  // Define a custom command for the REPL.
  REPL.defineCommand("loadMina", {
    help: "Loads o1js",
    action() {
      spinnies.add("load", {
        text: "Loading o1js...",
      });
      this.clearBufferedCommand();
      dynamicImport("o1js")
        .then((o1js) => {
          const local = o1js.Mina.LocalBlockchain({
            proofsEnabled: false,
          });
          o1js.Mina.setActiveInstance(local);

          const minaContext = {
            o1js,
            local,
            testAccounts: local.testAccounts,
            genKeyPair: genKeyPair(o1js),
          };

          Object.assign(this.context.mina, minaContext);

          spinnies.succeed("load", minaLoadedOkMsg());
          console.log();
          // Restore eval function.
          this.displayPrompt();
          REPL.eval = evalFn;
        })
        .catch((err) => {
          console.log(err);
          spinnies.fail("load", "Error while loading o1js");
        });
    },
  });
}

/**
 * Generates a key pair using o1js.
 * @param {Object} o1js - The o1js library.
 * @returns {Object} - An object containing the private and public keys.
 */
function genKeyPair(o1js) {
  return () => {
    const priv = o1js.PrivateKey.random();
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
module.exports = () => configureRepl(dynamicImport, genKeyPair);
