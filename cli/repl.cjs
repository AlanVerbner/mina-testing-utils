const repl = require("repl");
const ora = require("ora");

const { printLoadMinaErrorMsg, minaLoadedOkMsg } = require("./gui.cjs");

function configureRepl(dynamicImport, genKeyPair) {
  // Start a REPL session with the given options.
  const REPL = repl.start({
    prompt: "mina-testing-utils> ",
    ignoreUndefined: true,
    replMode: repl.REPL_MODE_STRICT,
    require,
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
    help: "Loads snarkyjs",
    action() {
      const spinner = ora({
        text: "Loading snarkyjs...",
        discardStdin: false,
      }).start();
      this.clearBufferedCommand();
      dynamicImport("snarkyjs")
        .then((snarkyjs) => {
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

          spinner.succeed(minaLoadedOkMsg());
          console.log();
          // Restore eval function.
          this.displayPrompt();
          REPL.eval = evalFn;
        })
        .catch((err) => {
        console.log(err);
          spinner.fail("Error while loading snarkyjs");
        });
    },
  });
}

module.exports = configureRepl;
