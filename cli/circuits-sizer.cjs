const fs = require("fs");
const path = require("path");
const Table = require("cli-table");
const Spinnies = require("spinnies");

const spinnies = new Spinnies({ spinner: { frames: ["⚙️"] } });

/**
 * Checks if the provided path is valid.
 * @param {string} inputPath - The path to check.
 * @returns {boolean} - Returns true if the path is valid, false otherwise.
 */
function isValidPath(inputPath) {
  if (!fs.existsSync(inputPath)) {
    console.error(`${inputPath} does not exist.`);
    return false;
  }

  const stats = fs.statSync(inputPath);
  if (!stats.isFile()) {
    console.error(`${inputPath} is not a file.`);
    return false;
  }
  return true;
}

/**
 * Processes a contract.
 * @param {string} contractName - The name of the contract.
 * @param {object} contract - The contract object.
 * @returns {Array} - Returns an array of methods.
 */
async function tryProcessContract(contractName, contract) {
  try {
    spinnies.add(contractName, {
      text: `Compiling ${contractName}`,
    });
    await contract.compile();
    spinnies.succeed(contractName, { text: `Compiling ${contractName}` });
    const methods = [];
    Object.keys(contract._methodMetadata).map((key) => {
      methods.push([
        contractName,
        key,
        contract._methodMetadata[key].gates.length,
      ]);
    });
    return methods;
  } catch (err) {
    spinnies.fail(conractName, {
      text: `Error while compiling ${contractName}`,
    });
  }
}

/**
 * Processes contracts from a file.
 * @param {string} inputPath - The path to the file.
 * @returns {Array} - Returns an array of rows.
 */
async function tryProcessContractsFromFile(inputPath) {
  const rows = [];
  try {
    const contracts = await import(inputPath);

    if (contracts.length == 0)
      console.error(`No contract founds in ${inputPath}`);

    return Promise.all(
      Object.keys(contracts).map((contractName) => {
        const contract = contracts[contractName];
        if (!contract.compile) return [];
        return tryProcessContract(contractName, contract);
      })
    );
  } catch (err) {
    console.log(err);
    console.error(
      `Couldn't import ${inputPath}, please check if it's a valid compiled contract.`
    );
  }

  return rows;
}

/**
 * Main function to process files.
 * @param {Array} files - The array of file paths.
 */
module.exports = async (files) => {
  const rows = (
    await Promise.all(
      files.map(async (inputPath) => {
        if (!path.isAbsolute(inputPath)) {
          inputPath = path.resolve(inputPath);
        }
        if (!isValidPath(inputPath)) return [];
        return await tryProcessContractsFromFile(inputPath);
      })
    )
  ).flat(2);

  if (rows.length == 0) {
    console.warn("No contracts were found");
  } else {
    const table = new Table({
      head: ["Contract", "Method", "Gates"],
      rows: rows.sort((a, b) => b[2] - a[2]),
    });

    console.log(table.toString());
  }
};
