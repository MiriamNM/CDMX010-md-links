const onlyPath = require('./mdLinks.js');
const pathValidate = require('./mdLinks.js');
const pathStat = require('./mdLinks.js');
const process = require('process');
const { option } = require('commander');


const cliCommand = process.argv;
const comands = {
  node: cliCommand[0],
  mdLinks: cliCommand[1],
  path: cliCommand[2],
  stats: cliCommand[3],
  validate: cliCommand[4],
}
console.log('myArgs: ', comands);

const argOptions = (arg1, arg2) => {
  const validate= comandos['validate'];
  const stats = comandos['stats'];
  
  options = {
  comandos,stats: false,
  comandos,validate: false
  }

  if(arg1 === '--validate' || arg1 === '-v') {
    options.validate = true
  } 
  if (arg2 === '--stats' || arg2 === '-s') {
    options.stats = true
  }
  console.log(options);
  return options
}

argOptions('--validate', null);
argOptions('--validate', '--stats');
argOptions(null, '--stats');
argOptions(null, null);
// const options = {
//   one: process.argv[2],
//   two: process.argv[3],
// };
// console.log('myArgs: ', options);

// const controller = (file, options) => {
//     const option = [];
//     if (options['two'] == undefined) {
//         option.push(options['one'])
//     } else if (options['two'] !== undefined) {
//         option.push(options['one'] + ' ' + options['two'])
//     }

//     option.forEach((option) => {
//       if (option == '--validate') {
//         pathValidate(file)
//       } else if (option == '--v') {
//         pathValidate(file)
//       } else if (option == '--s') {
//         pathStat(file)
//       } else if(option == '--stats') {
//         pathStat(file)
//       } else if(option == '--stats --validate') {
//         pathStat(file)
//         //DEBERIAN SER LOS ROTOS  como pathStat(file) pero incluyendo los rotos
//       } else 
//         onlyPath(file)
//     })
// }
// //controller('./documentos', '--stats');

module.exports = {controller: controller};