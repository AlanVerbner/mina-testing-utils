/**
 * @fileoverview This module exports functions to print banners and messages related to Mina Testing Utils.
 * @module cli/gui
 * @requires cfonts
 * @requires chalk
 */

const cfonts = require("cfonts");
const chalk = require("chalk");

const loadMinaMsg = `

Please load the Mina REPL context by executing ${chalk.underline.bold(
  ".loadMina"
)} before running any commands.

`;

/**
 * Prints a banner with the name of the module.
 * @function
 * @name printBanner
 * @returns {void}
 */
module.exports.printBanner = function printBanner() {
  cfonts.say("Mina Testing Utils", {
    font: "block",
    align: "left",
    gradient: ["red", "yellow"],
  });
  console.log(
    `
  ${chalk.bold(loadMinaMsg)}
  `
  );
};

/**
 * Prints an error message indicating that the Mina REPL context needs to be loaded.
 * @function
 * @name printLoadMinaErrorMsg
 * @returns {void}
 */
module.exports.printLoadMinaErrorMsg = function printLoadMinaErrorMsg() {
  console.log(chalk.red(loadMinaMsg));
};

/**
 * Returns a success message indicating that the Mina REPL context was loaded successfully.
 * @function
 * @name minaLoadedOkMsg
 * @returns {string} The success message.
 */
module.exports.minaLoadedOkMsg = function minaLoadedOkMsg() {
  return `Snarky loaded successfully! You can access it through the ${chalk.green.bold("mina")} object.`;
};
