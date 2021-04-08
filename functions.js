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
  const filesWithRead = fs.readFileSync(`${path.join(__dirName, file)}`, 'utf8');
  const links = getLinks(filesWithRead);
  // const validateL = validationLinks(links);
  // return console.log(validateL)
  return links
}


// Lectura de archivo de carpetas.
const filesDir = (archivePath) => {
	const dirWithRead = fs.readdirSync(archivePath, 'utf-8');
  dirWithRead.forEach((file) => {
    if (file === undefined) {
      console.log('Ingresa el archivo')
    } else {
      const extFile = path.extname(file);
      if (extFile === '.md') {
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
const extensionMD = '.md';
const extension = path.extname(files);
const expression = /^(.+)\/([^\/]+)$/m;
const result = archivePath.match(expression);

const onlyPath = (files) => {
if (extension === extensionMD) {
  return (readFiles(files))
} else if (result) {
  return (filesDir(files))
}
}
//return onlyPath()

archivePath = 'C:/Users/hp/Documents/Laboratoria/CDMX010-md-links/documentos';
const pathValidate = (files) => {
  return new Promise ((resolve, rejects) => {
    if (path.extname(files) === extensionMD) {
      const filesWithRead = fs.readFileSync(`${path.join(files, file)}`, 'utf8');
      const links = getLinks(filesWithRead);
      resolve(links)
    } else if (result) {
      filesDir(files);
    }
  })};
  pathValidate(archivePath)
    .then((result)=>{validationLinks(result)})
    .then((result)=>{statsStadistics(result)})
    .catch((err)=>{console.log(err)})
    return Promise.all()

