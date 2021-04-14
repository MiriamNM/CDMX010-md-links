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
    fetch(md)
      .then((res) => {
      //console.log(res,'gatito');
        if(res.status === 200) {
          console.log({path: path.resolve(linkMap), status: res.status, statusText: 'OK', url:linkMap});
        } else {
          console.log({path: path.resolve(linkMap), status: res.status, statusText: 'FAIL', url:linkMap});
        }
      })
      .catch(
        (error) => console.log(error)
      )
  });
 return md;
} 

// Estadistica de los links.
const statsStadistics = (resultado) => {
  let linksTotal = [];
  let linksBad = [];
  let result = {}
  resultado.forEach((link) => {
    linksTotal.push(link);
    if(res.status !== 200) {
          linksBad.push(link);
        }
    console.log(result, 'wiiiii');
    result = {
      Broken: linksBad.length,
      Unique: [...new Set(linksTotal)].length,
      total: linksTotal.length,
    }
    console.log(resultado, 'si toy');
    return resultado;
  });
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
      if (comands['validate'] === null) {
        resolve(console.log(getLinksMd));
      } else {
        resolve(validationLinks(getLinksMd));
      }
      rejects(error);
    
    })
  })   
}

MDLinks(comands)
.then((getLinksMd) => {
    if (comands['stats'] === null) {
      return Promise.all(console.log(getLinksMd));
    } else {
      return Promise.all(statsStadistics(getLinksMd));
    }
  })
  .then((res) => {console.log(res, 'patito')})
  .catch((err) => {return err});  
MDLinks(comands['path'],(comands['validate']&&comands['stats']))