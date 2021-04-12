/* eslint-disable no-undef */
const mdLinks = require('./mdLinks');
const path = require('path');
const searchDir = require('./mdLinks.js');
const onlyFile = require('./mdLinks.js');
const isDir = require('./mdLinks.js');

module.exports = MDLinks = (files) => {
    const extension = path.extname(files);
    if (extension === '.md') {
        return (onlyFile(files));
    } else if (searchDir(files)) {
        return (isDir(files));
    } 
}

MDLinks('./documentos')