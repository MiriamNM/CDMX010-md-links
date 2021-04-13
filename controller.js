const process = require('process');

const cliCommand = process.argv;
const comands = {
  node: cliCommand[0],
  mdLinks: cliCommand[1],
  path: cliCommand[2],
  stats: cliCommand[3],
  validate: cliCommand[4],
}
console.log('myArgs: ', comands);

module.exports = {comands: comands};