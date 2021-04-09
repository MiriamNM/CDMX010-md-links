const colors = require('colors');
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const { get } = require('http');
const { url } = require('inspector');
const { Console } = require('console');
const { resolveAny } = require('dns');
const { rejects } = require('assert');

// Path.
const archivePath = 'C:/Users/hp/Documents/Laboratoria/CDMX010-md-links/documentos';

// Ruta.
const way = (file) => {
const join = archivePath;
const joinFile = file;
console.log(`link: ${path.join(join, joinFile)}`.bgGreen);
} 

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
}

// Path en objeto de validación de Links.S
const parsePath = path.parse(__filename);
const dirPath = parsePath.dir;

// Fetch para obtener validación de los Links.
const linksFetch = (link) => {
  let arrayLinks = [];
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

// Objeto de la validación de los links. 
const validateStatus = (res, link) => {
  if(res.statusText === 'OK') {
    console.log({path: dirPath, status: res.status, statusText: 'OK', url:link})
  } else {
    console.log({path: dirPath, status: res.status, statusText: 'FAIL', url:link})
  }
}

// Links unicos.
const uniqueLinks = (arrayLinks) => {
	let allLinks = arrayLinks.map((infoLink) => {return infoLink.url});
	let uniqueLinks = allLinks.filter((item, index)=> allLinks.indexOf(item) === index);
	return uniqueLinks;
}

// Estadistica de los links.
const statsStadistics = (arrayLinks) => {
  let theUnique = uniqueLinks(arrayLinks);
  let onlyLinks = [];
  let linksFine =[];
  let linksBad = [];
  let totalLinks = [];
  let result = {};
  arrayLinks.forEach((link) => {
    totalLinks.push(link);
    onlyLinks.push(theUnique);
    if (link.statusText === 'OK') {
      linksFine.push(link);
    } else if (link.statusText === 'FAIL') {
      linksBad.push(link)
    }
  });
  result = {
    Correct: linksFine.length,
    Unique: onlyLinks.length,
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
  const filesWithRead = fs.readFileSync(file, 'utf8')
  .then((data) => {getLinks(data)})
  .catch((err)=> {console.log(err)});
  return filesWithRead
}


// Lectura de archivo de carpetas.
const filesDir = (files) => {
  const extension = path.extname(file);
	const dirWithRead = fs.readdirSync(files, 'utf-8')
  .then((data) => {
  console.log(data);
  data.forEach((file) => {
    if (file === undefined) {
      console.log('Ingresa el archivo')
    } else {
      if (extension === '.md') {
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
  })
  }).catch((err) => console.log(err))
  return dirWithRead;  
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
  const extension = path.extname(files);
  if (extension === '.md') {
    return (readFiles(files))
  } else if (searchDir(files)) {
    return (filesDir(files))
  }
}
return onlyPath()

// Cuando ponen path y validate.
// const pathValidate = (files) => {
//   return new Promise ((resolve, reject) => {
//     if (path.extname(files) === '.md') {
//       const archivesRead = fs.readFileSync(files, 'utf8')
//       .then((data) => {getLinks(data)});
//       resolve(archivesRead)
//     } else if (searchDir(files)) {
//       reject(filesDir(files));
//     }
//   })};
//  return Promise.all(pathValidate(archivePath))
//   .then((res)=> {
//     validationLinks(res)
//   })
//   .catch((err)=> {
//     return err
//   });


// Cuando ponen path stats y validate.
// const pathValidate = (files) => {
//   return new Promise ((resolve, reject) => {
//     if (path.extname(files) === '.md') {
//       const archivesRead = fs.readFileSync(files, 'utf8');
//       const links = getLinks(archivesRead);
//       resolve(links);
//     } else if (searchDir(files)) {
//       reject(filesDir(files));
//     }
//   })};
//  pathValidate(archivePath)
//     .then((res)=>{
//       validationLinks(res)
//       return Promise.all(res)
//     })
//     .catch((err)=>{console.log(err)});