#!/usr/bin/env node --experimental-vm-modules --experimental-wasm-threads

const { Command } = require("commander");
const { name, description, version } = require("../package.json");
const repl = require("./repl.cjs");
const { printBanner } = require("./gui.cjs");
const circuitsSizer = require("./circuits-sizer.cjs");

const program = new Command();

program.name(name).description(description).version(version);

program
  .command("repl")
  .description("Runs Mina Testing Utils repl")
  .action((str, options) => {
    printBanner();
    repl();
  });

program
  .command("circuits-sizer")
  .description("Analyzes contracts gates amount")
  .argument("<files...>", "Specify the file")
  .action((files) => {
    return circuitsSizer(files);
  });

program.parse();
