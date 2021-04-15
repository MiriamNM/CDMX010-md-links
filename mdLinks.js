const colors = require('colors');
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const { get } = require('http');
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
const validationLinks = (md) => {
  md.forEach((link) => {
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
 return md;
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
  console.log(resultado, 'si toy');
  return result;
}

// función para poner los archivos md en un array.
const mds = (filePath) => {
  let md = [];
  if (fs.statSync(filePath).isDirectory()) {
    const files = filesDir(filePath);
        files.forEach((file) => {
          if (path.extname(file) === '.md') {
            const mdDir = path.join(filePath,file)
            md= md.concat(mdDir);
          } else {
          console.log('No es .md')
          }
        })
  } else if (path.extname(filePath) === '.md') {
    md= md.concat(filePath); 
  }
  return (md)
}

// FUNCIÓN DE MDLINKS, NO DEBE IR AQUÍ PERO AUN NO SE MODULAR BIEN.
const MDLinks = (filePath, comands) => {
  return new Promise((resolve, rejects) => {
    const md = mds(filePath);
    md.forEach((fileMd) => {
      const readMd = readFile(fileMd);
      const getLinksMd = getLinks(readMd);
      if (comands['validate'] === null || comands['validate'] === undefined) {
        resolve(console.log(getLinksMd));
      } else {
        resolve(validationLinks(getLinksMd));
      }
      rejects(error);
    })
  })   
}

Promise.all(MDLinks())
  .then((res) => {
    if (comands['stats'] === null || comands['stats'] === undefined) {
      return (console.log(getLinks(res)));
    } else {
      return (statsStadistics(res));
    }
  })
  .then((res) => {console.log(res, 'patito')})
  .catch((err) => {console.log(err, '<<<<<<<')});  
MDLinks(comands['path'],(comands['validate']&&comands['stats']))