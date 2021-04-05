const isMdOrNot = require('./files-paths.js');
const filesDir = require('./files-paths.js');
const readFiles = require('./files-paths');

module.exports = () => {
    // ...
  
  };

const mdLinks = (path, options) => {
    if (path !== isMdOrNot(path)) {
        console.log('No es un archivo MD'.rainbow)
        readFiles();
        //función de un solo archivo.
    } else {
        filesDir();
    }
};
return mdLinks();