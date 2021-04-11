const onlyPath = require('./functions.js');
const pathValidate = require('./functions.js');
const pathStat = require('./functions.js');
const process = require('process');

const path = 'C:/Users/hp/Documents/Laboratoria/CDMX010-md-links/documentos';
const options = {
  one: process.argv[2],
  two: process.argv[3],
  three: process.argv[4],
}
const mdLinks = (path, options) => {
  switch (options) {
  case '--stats':
      pathStat(path)
  break;
  case '--validate':
    pathValidate(path)
  break;
  case '--stats --validate':
    pathStat(path)
  break;
  default: 
    onlyPath(path)
  }
}
mdLinks(path, options);

