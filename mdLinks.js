const colors = require('colors');
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const { get } = require('http');
//const controller = require('./controller.js');
const process = require('process');
//const MDLinks = require('./index.js');

const cliCommand = process.argv;
const comands = {
  node: cliCommand[0],
  mdLinks: cliCommand[1],
  path: cliCommand[2],
  stats: cliCommand[3],
  validate: cliCommand[4],
}
console.log('myArgs: ', comands);

const argOptions = (arg1, arg2) => {
  const validate= comands['validate'];
  const stats = comands['stats'];
  
  options = {
  comands,stats: false,
  comands,validate: false
  }

  if(arg1 === '--validate' || arg1 === '-v') {
    options.validate = true
  } 
  if (arg2 === '--stats' || arg2 === '-s') {
    options.stats = true
  }
  console.log(options);
  return options
}

argOptions('--validate', null);
argOptions('--validate', '--stats');
argOptions(null, '--stats');
argOptions(null, null);

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
  console.log(resultado);
  return result;
}

// Dice si es carpeta o no.
const searchDir = (files) => {
  const expression = /^(.+)\/([^\/]+)$/m;
  const result = files.match(expression);
  return result;
}

// leer archivo INDIVIDUAL.
const readFile = (file) => {
  const filesWithRead = fs.readFileSync(file, 'utf8');
  return filesWithRead;
}

// Leer un archivo de directorio
const readFileDir = (file) => {
  const absolutPath = path.resolve(files);
  const filesWithRead = fs.readFileSync(path.join(absolutPath, file), 'utf8');
  return filesWithRead;
}

// Lectura de archivo de carpetas.
const filesDir = (files) => {
	const dirWithRead = fs.readdirSync(files, 'utf-8');
  return dirWithRead;
}

// Función para un archivo.
const onlyFile = (file) => {
  if (file === undefined) {
    console.log('Ingresa el archivo')
  } else {
    const extension = path.extname(file);
    if (extension === '.md') {
      const content = readFile(file);
      if (argOptions === ('--v' || '--validate')) {
        return validateLinks(content)
      } else if (argOptions === ('--s' || '--stats')) {
        validateLinks(content)
          .then((arrayLinks) => {
            const stats = statsStadistics(arrayLinks);
            return Promise.all(stats);
          }).then((res)=> {
            console.log(res)
          })
          .catch((err) => console.log(err));
      } else if (argOptions === ('--v','--s' && '--validate','--stats')) {
        validateLinks(content)
          .then((arrayLinks) => {
            const stats = statsStadistics(arrayLinks);
            return Promise.all(stats);
          }).then((res)=> {
            console.log(res)
          })
          .catch((err) => console.log(err));
      } else {
        return getLinks(content);
      }
    } else {
      console.log('Solo archivos .md');
      return false; 
    }; 
}  
}

// Función para una carpeta.
const isDir = (files) => {
  const contentDir = filesDir(files);
  contentDir.forEach((file) => {
    if (file === undefined) {
      console.log('Ingresa el archivo')
    } else {
      const extension = path.extname(file);
      if (extension === '.md') {
        const content = readFileDir(file);
      if (controller === '--v' || '--validate') {
        return validateLinks(content)
      } else if (controller === '--s' || '--stats') {
        validateLinks(content)
          .then((arrayLinks) => {
            const stats = statsStadistics(arrayLinks);
            return Promise.all(stats);
          }).then((res)=> {
            console.log(res)
          })
          .catch((err) => console.log(err));
      } else if (controller === '--v' && '--s' || '--validate' && '--stats') {
        validateLinks(content)
          .then((arrayLinks) => {
            const stats = statsStadistics(arrayLinks);
            return Promise.all(stats);
          }).then((res)=> {
            console.log(res)
          })
          .catch((err) => console.log(err));
      } else {
        return getLinks(content);
      }
      } else {
        console.log('Este no es un archivo .md');
        return false; 
      };     
    };
  }) 
}

// Función MDLinks
MDLinks = (files) => {
  const extension = path.extname(files);
  if (extension === '.md') {
      return (onlyFile(files));
  } else if (searchDir(files)) {
      return (isDir(files));
  } 
}

MDLinks('./documentos/doc1.md')

// module.exports = {onlyFile: onlyFile};
// module.exports = {isDir: isDir};
// module.exports = {searchDir: searchDir};

