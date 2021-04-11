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

// Obtener los links.
const getLinks = (data) => {
const resultado = data.match(/\bhttps?:\/\/\S+/gi);
return resultado;
}

// Función que une getLinks  y validationLinks.
const validateLinks = (data) => {
  return new Promise((resolve, rejects) => {
    const resultado = data.match(/\bhttps?:\/\/\S+/gi);
    if (resultado) {
      resolve(validationLinks(resultado));
    } else {
      rejects(console.log(error))
    }
    });
}

//Validar links.
const validationLinks = (resultado) => {
  resultado.forEach((link) => {
      const newLinks = link.replace(/[{()}]/g, '');
      //console.log(newLinks);
      linksFetch(newLinks);
  });
  return resultado
}

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

// Path en objeto de validación de Links.S
const parsePath = path.parse(__filename);
const dirPath = parsePath.dir;

// Objeto de la validación de los links. 
const validateStatus = (res, link) => {
  if(res.statusText === 'OK') {
    console.log({path: dirPath, status: res.status, statusText: 'OK', url:link})
  } else {
    console.log({path: dirPath, status: res.status, statusText: 'FAIL', url:link})
  }
}

// Estadistica de los links.
const statsStadistics = (arrayLinks) => {
  let linksBad = [];
  let totalLinks = [];
  let result = {};
  arrayLinks.forEach((link) => {
    totalLinks.push(link);
    if (link.status !== '200') {
      linksBad.push(link)
    }
  });
  result = {
    Broken: linksBad.length,
    Unique: [...new Set(totalLinks)].length,
    total: totalLinks.length,
  }
  console.log(result);
  return result;
}

//leer archivo INDIVIDUAL.
const readFile = (file) => {
  const filesWithRead = fs.readFileSync(path.join(archivePath, file), 'utf8');
  console.log(filesWithRead);
  const links = getLinks(filesWithRead);
  return console.log(links);
}

// Lectura de archivo de carpetas.
const filesDir = (files) => {
	const dirWithRead = fs.readdirSync(files, 'utf-8');
  console.log(dirWithRead);
  dirWithRead.forEach((file) => {
    if (file === undefined) {
      console.log('Ingresa el archivo')
    } else {
      const extension = path.extname(file);
      if (extension === '.md') {
        // manipular cada archivo.
        console.log(file.bgRed);
        // leer cada archivo.
        readFile(file)
      } else {
        console.log('Este no es un archivo .md');
        return false; 
      };     
    };
  }) 
}
//return filesDir()

//leer archivo.
const readFilePromisse = (file) => {
  const filesWithRead = fs.readFileSync(path.join(archivePath, file), 'utf8');
  const valideLinks = validateLinks(filesWithRead);
  return console.log(valideLinks);
}

// Lectura de archivo de carpetas con promesa.
const filesDirPromisse = (files) => {
	const dirWithRead = fs.readdirSync(files, 'utf-8');
  console.log(dirWithRead);
  dirWithRead.forEach((file) => {
    if (file === undefined) {
      console.log('Ingresa el archivo')
    } else {
      const extension = path.extname(file);
      if (extension === '.md') {
        // manipular cada archivo.
        console.log(file.bgRed);
        // leer cada archivo.
        readFilePromisse(file)
      } else {
        console.log('Este no es un archivo .md');
        return false; 
      };     
    };
  }) 
}

//return filesDir()

//leer archivo con promesa stats
const readFilePromisseStat = (file) => {
  const filesWithRead = fs.readFileSync(path.join(archivePath, file), 'utf8');
  validateLinks(filesWithRead)
    .then((arrayLinks) => {
      const stats = statsStadistics(arrayLinks);
      return Promise.all(stats);
    }).then((res)=> {
      console.log(res)
    })
    .catch((err) => console.log(err));
}

// Lectura de archivo de carpetas con promesa stats
const filesDirPromisseStat = (files) => {
	const dirWithRead = fs.readdirSync(files, 'utf-8');
  console.log(dirWithRead);
  dirWithRead.forEach((file) => {
    if (file === undefined) {
      console.log('Ingresa el archivo')
    } else {
      const extension = path.extname(file);
      if (extension === '.md') {
        // manipular cada archivo.
        //console.log(file.bgRed);
        // leer cada archivo.
        readFilePromisseStat(file)
      } else {
        console.log('Este no es un archivo .md');
        return false; 
      };     
    };
  }) 
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
    return (readFile(files))
  } else if (searchDir(files)) {
    return (filesDir(files))
  }
  return
}
//return onlyPath(archivePath)

// Cuando ponen path y validate.
const pathValidate = (files) => {
  const extension = path.extname(files);
  if (extension === '.md') {
    return (readFilePromisse(files))
  } else if (searchDir(files)) {
    return (filesDirPromisse(files))
  }
  return
}
//return pathValidate(archivePath)

// Cuando ponen path y validate.
const pathStat = (files) => {
  const extension = path.extname(files);
  if (extension === '.md') {
    return (readFilePromisseStat(files))
  } else if (searchDir(files)) {
    return (filesDirPromisseStat(files))
  }
  return
}
//return pathStat(archivePath)

module.exports = {onlyPath: onlyPath};
module.exports = {pathValidate: pathValidate};
module.exports = {pathStat: pathStat};
module.exports = {getLinks: getLinks};