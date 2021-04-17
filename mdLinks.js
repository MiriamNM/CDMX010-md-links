const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');

//leer archivo INDIVIDUAL.
const readFile = (file) => {
  const filesWithRead = fs.readFileSync(file, 'utf8');
  return filesWithRead;
}

// Lectura de archivo de carpetas.
const filesDir = (files) => {
	const dirWithRead = fs.readdirSync(files, 'utf-8');
  return dirWithRead;
}

// Obtener los links.
const getLinks = (data) => {
const resultado = data.match(/\bhttps?:\/\/\S+/gi);
return resultado;
}

//Validar links.
const validationLinks = (links) => {
  const promises = links.map((link) => { // [Promise, Promise, Promise]
    const linkMap = link.replace(/[{()}]/g, '');
    return fetch(linkMap)
      .then((res) => {
        const link = { 
          path: path.resolve(linkMap),
          status: res.status,
          statusText: res.ok ? 'OK' : 'FAIL', 
          url: linkMap 
        }
        return link
      })
      .catch(() => {
          const link = { 
            path: path.resolve(linkMap),
            status: 500,
            statusText: 'FAIL', 
            url: linkMap 
          }
          return link
        }
      )
  });
  return Promise.all(promises);
}  

// Función que filtra los links del arreglo.
const getBrokenLinks = (links) => {
  return links.filter(link => link.statusText == 'FAIL')
}

// Función con la que se conoce la longitud de de broken.
const brokenStats = (links) => {
  const brokenLinks =  getBrokenLinks(links);
  return brokenLinks.length;
}
// Estadistica global.
const globalStats = (links) => {
  const result = {
    unique: [...new Set(links)].length,
    total: links.length,
  }
  return result;
}

// función para poner los archivos md en un array.
const getMds = (filePath) => {
  let arrayMd = [];
  if (fs.statSync(filePath).isDirectory()) {
    const files = filesDir(filePath);
        files.forEach((file) => {
          if (path.extname(file) === '.md') {
            const mdDir = path.join(filePath,file)
            arrayMd= arrayMd.concat(mdDir);
          } else {
          console.log('No es .md')
          }
        })
  } else if (path.extname(filePath) === '.md') {
    arrayMd= arrayMd.concat(filePath); 
  }
  return (arrayMd)
}

module.exports = {
  readFile,
  getLinks,
  validationLinks,
  brokenStats,
  globalStats,
  getMds,
}