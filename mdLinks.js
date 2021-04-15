const colors = require('colors');
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
//const controller = require('./controller.js');
const process = require('process');
const { rejects } = require('assert');
const { resolve } = require('path');
const { error } = require('console');
//const MDLinks = require('./index.js');

// FUNCIÓN DE CLI, NO DEBE IR AQUÍ PERO AUN NO SE MODULAR BIEN.
const cliCommand = process.argv;
const comands = {
  node: cliCommand[0],
  mdLinks: cliCommand[1],
  path: cliCommand[2],
  validate: cliCommand[3],
  stats: cliCommand[4],
}

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
  links.forEach((link) => {
    const linkMap = link.replace(/[{()}]/g, '');
    fetch(linkMap)
      .then((res) => {
        if(res.statusText === 'OK') {
          console.log({path: path.resolve(linkMap), status: res.status, statusText: 'OK', url:linkMap})
        } else {
          console.log({path: path.resolve(linkMap), status: res.status, statusText: 'FAIL', url:linkMap})
        }
      })
      .catch(
        (error) => console.log(error)
      )
  })
 return links;
} 

// Estadistica de los links.
const statsStadistics = (arrayMd) => {
  console.log(arrayMd, 'vaquita')
  let linksTotal = [];
  let linksBad = [];
  let result = {}
  arrayMd.forEach((link) => {
    linksTotal.push(link);
    if(link.statusText === 'FAIL') {
          linksBad.push(link);
        }
  });
  result = {
    Broken: linksBad.length,
    Unique: [...new Set(linksTotal)].length,
    total: linksTotal.length,}
  
  console.log(result, 'wiiiii');
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

// FUNCIÓN DE MDLINKS, NO DEBE IR AQUÍ PERO AUN NO SE MODULAR BIEN.
const MDLinks = (filePath, comands) => {
  return new Promise((resolve, rejects) => {
    const arrayMd = getMds(filePath);
    arrayMd.forEach((fileMd) => {
      const archiveContent = readFile(fileMd);
      const theLinks = getLinks(archiveContent);
      if (comands['validate'] === null || comands['validate'] === undefined) {
        resolve(theLinks);
      } else {
        resolve(validationLinks(theLinks));
      }
      rejects(console.log(error, '>>>>>>>>>'));
    })
  })   
}

MDLinks()
  .then((res) => {
    if (comands['stats'] === null || comands['stats'] === undefined) {
      return Promise.all(console.log(getLinks(res)));
    } else {
      return Promise.all(statsStadistics(res));
    }
  })
  .then((res) => {console.log(res, 'patito')})
  .catch((err) => {console.log(err, '<<<<<<<')});  
MDLinks(comands['path'],(comands['validate']&&comands['stats']))