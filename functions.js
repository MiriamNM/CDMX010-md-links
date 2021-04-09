const colors = require('colors');
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const { get } = require('http');
const { url } = require('inspector');
const { Console } = require('console');
const { resolveAny } = require('dns');
const { rejects } = require('assert');

const archivePath = 'C:/Users/hp/Documents/Laboratoria/CDMX010-md-links/documentos';

// Ruta
const way = (file) => {
const join = archivePath;
const joinFile = file;
console.log(`link: ${path.join(join, joinFile)}`.bgGreen);
}


// Verificar si es carpeta.
//const isMdOrNot = (archivePath) => {
  
  //console.log(result)
 

// Obtener los links.
const getLinks = (data) => {
const resultado = data.match(/\(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}\gi/gm);
return resultado;
}

//Validar links.
const validationLinks = (getLinks) => {
  getLinks().forEach((link) => {
      const newLinks = link.slice(1,40);
      //console.log(newLinks);
      linksFetch(newLinks);
  });
  // statsStadistics(resultado);
}

const parsePath = path.parse(__filename);
const dirPath = parsePath.dir;

const linksFetch = (link) => {
  const arrayLinks = [];
  arrayLinks.push(link);
  arrayLinks.map(() => {
  fetch(arrayLinks,get)
    .then((res) => {
        validateStatus(res, link);
     }
    )
    .catch(
      (error) => console.log(error)
    )
    })
} 

const validateStatus = (res, link) => {
  if(res.statusText === 'OK') {
    console.log({path: dirPath, status: res.status, statusText: 'OK', url:link})
  } else {
    console.log({path: dirPath, status: res.status, statusText: 'FAIL', url:link})
  }
}

const statsStadistics = (arrayLinks) => {
  let linksFine = [];
  let linksBad = [];
  let totalLinks = [];
  let result = {};
  arrayLinks.forEach((link) => {
    totalLinks.push(link);
    if (link.statusText === 'OK') {
      linksFine.push(link);
    } else if (link.statusText === 'FAIL') {
      linksBad.push(link)
    }
  });
  result = {
    Correct: linksFine.length,
    Broken: linksBad.length,
    total: totalLinks.length,
  }
  console.log(result);
  return result;
  // let linksOK = arrayLinks.filter(arrayLink => arrayLink.statusText === 'OK');
  // let oks = linksFine.push(linksOK);
  // let linksFail = arrayLinks.filter(arrayLink => arrayLink.statusText === 'FAIL');
  // let fails = linksBad.push(linksFail);
  // console.log('Correct:', oks.length);
  // console.log('Broken:', fails.length);
}

//leer archivo.
const readFiles = (file) => {
  const filesWithRead = fs.readFileSync(file, 'utf8');
  const links = getLinks(filesWithRead);
  return links
}


// Lectura de archivo de carpetas.
const filesDir = (files) => {
	const dirWithRead = fs.readdirSync(__dirname, 'utf-8');
  console.log(__dirname.bgRed);
  console.log(__filename.bgRed);
  dirWithRead.forEach((file) => {
    if (file === undefined) {
      console.log('Ingresa el archivo')
    } else {
      if (path.extname(file) === '.md') {
        // manipular cada archivo.
        console.log(file.bgRed);
        way(file);
        // leer cada archivo.
        readFiles(file)
      } else {
        console.log('Este no es un archivo .md');
        return false; 
      };     
    };
  });  
}
//return filesDir()

//Busca si el path es carpeta.
const searchDir = (files) => {
const expression = /^(.+)\/([^\/]+)$/m;
const result = files.match(expression);
return result;
}

//cuando solo ponen path
const onlyPath = (files) => {
if (path.extname(files) === '.md') {
  return (readFiles(files))
} else if (searchDir(files)) {
  return (filesDir(files))
}
}
//return onlyPath()

// Cuando ponen path y validate.
const pathValidate = (files) => {
  return new Promise ((resolve, reject) => {
    if (path.extname(files) === '.md') {
      const filesWithRead = fs.readFileSync(files, 'utf8');
      const links = getLinks(filesWithRead);
      resolve(links)
    } else if (searchDir(files)) {
      reject(filesDir(files));
    }
  })};
  return Promise.all(pathValidate(archivePath))
    .then((res)=>{validationLinks(res)})
    .then((res)=>{statsStadistics(res)})
    .catch((err)=>{console.log(err)});