const colors = require('colors');
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
//const { get } = require('http');
const { url } = require('inspector');
const { Console } = require('console');
const { resolveAny } = require('dns');

// Path carpeta de prueba.
const pathDir = 'C:/Users/hp/Documents/Laboratoria/CDMX010-md-links/documentos';

// Ruta
const way = (file) => {
const join = pathDir;
const joinFile = file;
const wayPath = `${path.join(join, joinFile)}`;
return wayPath;
}

const extensionMD = '.md';

// Ver si es carpeta o archivo. 
const fileOrDir = (pathDir) => {
  const files = pathDir;
  const extension = path.extname(files);

  if(extension === extensionMD){
    readFiles(pathDir);
    console.log(pathDir);
  }
  else if (dir(pathDir)) {
    filesDir(files);
    console.log(files);
  }
}


const dir = (pathDir) => {
  const result = pathDir.match(/^(.+)\/([^\/]+)$/m);
  return result
}

// para dar path en arreglos 
const parsePath = path.parse(__filename);
const dirPath = parsePath.dir;

// Obtener los links.
const getLinks = (data) => {
const resultado = data.match(/\(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}\gi/gm);
validationLinks(resultado);
return resultado

}

//Validar links.
const validationLinks = (resultado) => {
  resultado.forEach((link) => {
    const newLinks = link.slice(1,-1);
    //console.log(newLinks);
    linksFetch(newLinks);   
  });
  //statsStadistics(resultado);
}

//fetch a los links para hacer arreglos de validación.
const linksFetch = (link) => {
  const arrayLinks = [];
  arrayLinks.push(link.replace(')', ''));
  console.log(arrayLinks);
  // statsStadistics(arrayLinks);
  // statsStadistics(arrayLinks);
  arrayLinks.map((arrayLink) => {
    // console.log(arrayLink);
    //console.log(link);
    // statsStadistics(arrayLinks);
  fetch(arrayLink)
    .then((res) => {
      //console.log(res);
      validateStatus(res, link);
    })
    .catch(
      (error) => {console.log(error)
    })
    });
  //statsStadistics(arrayLinks);
} 

// Objeto de validación.
const validateStatus = (res, link) => {
  if(res.statusText === 'OK') {
    console.log({path: dirPath, status: res.status, statusText: 'OK', url:link})
  } else {
    console.log({path: dirPath, status: res.status, statusText: 'FAIL', url:link})
  };
}

// Función de estadistica de links.
const statsStadistics = (arrayLinks) => {
  let linksFine = [];
  let linksBad = [];
  let totalLinks = [];
  let result = {};
  //console.log(arrayLinks);
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
  //console.log(result);
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
  fs.readFileSync(way(file), 'utf8');
  getLinks(file);
}

// Lectura de archivo de carpetas.
const filesDir = (data) => {
	const readDir = fs.readdirSync(pathDir, 'utf-8');
  readEveryFile(data);
  return readDir()
}

// forEach para leer cada archivo de carpeta.
const readEveryFile = (data) => {
  data.forEach((file) => {
    if (file === undefined) {
      console.log('Ingresa el archivo')
    } else {
      const extFile = path.extname(file);
      if (extFile === '.md') {
        // manipular cada archivo.
        //console.log(file.bgRed);
        //way(file);
        // leer cada archivo.
        readFiles(file)
      } else {
        console.log('Este no es un archivo .md');
        return false; 
      };     
    };
  }); 
}

// const onlyPath = (pathDir) => {
//   fileOrDir(pathDir)
//     .then((data)=>{
//       getLinks(data)
//       console.log(data);
//     })
//     .catch((err)=>{console.log(err)});
// }
// return onlyPath();
