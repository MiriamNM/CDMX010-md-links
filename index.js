const path = require('path');
const searchDir = require('./mdLinks.js');
const isFile = require('./mdLinks.js');
const isDir = require('./mdLinks.js');
const comands = require('./controller.js');

module.exports = MDLinks = (files) => {
    const extension = path.extname(files);
    if (extension === '.md') {
        return (isFile(files));
    } else if (searchDir(files)) {
        return (isDir(files));
    } 

    options('--validate', null);
    options('--validate', '--stats');
    options(null, '--stats');
    options(null, null);  
    return
}

MDLinks(comands['path'],(comands['stats']&&comands['validate']))