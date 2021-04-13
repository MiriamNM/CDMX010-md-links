const colors = require('colors');
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const { get } = require('http');
//const controller = require('./controller.js');
const process = require('process');
//const MDLinks = require('./index.js');

// FUNCIÓN DE CLI, NO DEBE IR AQUÍ PERO AUN NO SE MODULAR BIEN.
const cliCommand = process.argv;
const comands = {
  node: cliCommand[0],
  mdLinks: cliCommand[1],
  path: cliCommand[2],
  stats: cliCommand[3],
  validate: cliCommand[4],
}
console.log('myArgs: ', comands);

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
  resultado.map((link) => {
    // const newLinks = link.replace(/[{()}]/g, '');
    // arrayLinks.push(newLinks);
    //console.log(newLinks);
  
    //arrayLinks.map(() => {
      fetch(resultado,get)
        .then((res) => {
          if(res.statusText === 'OK') {
            return {path: path.resolve(link), status: res.status, statusText: 'OK', url:link}
          } else {
            return {path: path.resolve(link), status: res.status, statusText: 'FAIL', url:link}
          }
        })
        .catch(
          (error) => console.log(error)
        )
      //})
  });
  return resultado
} 

// Objeto de la validación de los links. 


// Estadistica de los links.
const statsStadistics = (arrayLinks) => {
  let linksBad = [];
  let result = {}
  arrayLinks.forEach((res, link) => {
    if (res.statusText !== 'OK') {
      linksBad.push(link)
    }
  });
  result = {
    Broken: linksBad.length,
    Unique: [...new Set(arrayLinks)].length,
    total: arrayLinks.length,
  }
  console.log(resultado);
  return result;
}

//para tener la ruta absoluta del archivo de la carpeta.
const absolutPath = (files, file) => {
  const extension = path.extname(file);
  if (extension === '.md') {
    return file; 
  } else if (searchDir(files)) {
    const thePath = path.resolve(files);
    const joinPath = path.join(thePath, file);
    return joinPath
  }  
  
}

// Dice si es carpeta o no.
const searchDir = (files) => {
  const expression = /^(.+)\/([^\/]+)$/m;
  const result = files.match(expression);
  return result;
}

// leer archivo INDIVIDUAL.
// const readFile = (file) => {
//   const filesWithRead = fs.readFileSync(absolutPath, 'utf8');
//   return filesWithRead;
// }

// Leer un archivo de directorio
const readFile = (files, file) => {
  const filesWithRead = fs.readFileSync(absolutPath(files, file), 'utf8');
  return filesWithRead;
}

// Lectura de archivo de carpetas.
const filesDir = (files) => {
	const dirWithRead = fs.readdirSync(files, 'utf-8');
  return dirWithRead;
}

// Función para un archivo.
// const isFile = (file) => {
//   if (file === undefined) {
//     console.log('Ingresa el archivo')
//   } else {
//     const extension = path.extname(file);
//     if (extension === '.md') {
//       const content = readFile(file);
//       if (comands['validate'] === '--v' || comands['validate'] === '--validate') {
//         return validateLinks(content)
//       } else if (comands['stats'] === '--s' || comands['stats'] === '--stats') {
//         validateLinks(content)
//           .then((arrayLinks) => {
//             const stats = statsStadistics(arrayLinks);
//             return Promise.all(stats);
//           }).then((res)=> {
//             console.log(res)
//           })
//           .catch((err) => console.log(err));
//       } else {
//         return getLinks(content);
//       }
//     } else {
//       console.log('Solo archivos .md');
//       return false; 
//     }; 
// }  
// }



// Función para una carpeta.
// const isDir = (files) => {
//   const contentDir = filesDir(files);
//   console.log(contentDir, 'gatitos');
//   contentDir.forEach((file) => {
//     if (file === undefined) {
//       console.log('Ingresa el archivo')
//     } else {
//       const extension = path.extname(file);
//       if (extension === '.md') {
//         const content = readFileDir(files, file);
//         if (comands['validate'] === '--v' || comands['validate'] === '--validate') {
//           return validateLinks(content)
//         } else if (comands['stats'] === '--s' || comands['stats'] === '--stats') {
//           validateLinks(content)
//             .then((arrayLinks) => {
//               console.log(arrayLinks, 'perritos');
//               const stats = statsStadistics(arrayLinks);
//               return Promise.all(stats);
//             }).then((res)=> {
//               console.log(res, 'ay')
//             })
//             .catch((err) => console.log(err));
//         }  else {
//           return getLinks(content);
//         }
//       } else {
//         console.log('Este no es un archivo .md');
//         return false; 
//       };     
//     };
//   }) 
// }

// const readArchive = (md) => {
//   const content = readFile(md);
//   const links = getLinks(content);
//       if (comands['validate'] === '--v' || comands['validate'] === '--validate') {
//         return validateLinks(links)
//       } else if (comands['stats'] === '--s' || comands['stats'] === '--stats') {
//         return statsStadistics(links)
//       } else {
//         return getLinks(content);
//       }
// }

const mds = (filePath) => {
  let md = [];
  const extension = path.extname(filePath);
  if (extension === '.md') {
    let arr = md.push(filePath); 
    console.log(arr, 'cerditos');   
  } else if (searchDir(filePath)) {
    const files = filesDir(filePath);
    console.log(files);
    files.forEach((file) => {
      if (extension === '.md') {
        console.log(file,'pingüinos');
        let arr = md.push(file);
        console.log(arr, 'campanita');
        
      } else {
      console.log('No es .md')
      }
    })
  } 
  console.log(md, 'patito')
  return md
}


// FUNCIÓN DE MDLINKS, NO DEBE IR AQUÍ PERO AUN NO SE MODULAR BIEN.
MDLinks = (filesPath, options) => {
  const md = mds(filesPath);
  const links = getLinks(md);
      if (comands['validate'] === '--v' || comands['validate'] === '--validate') {
        return validateLinks(links)
      } else if (comands['stats'] === '--s' || comands['stats'] === '--stats') {
        return statsStadistics(links)
      } else {
        return links;
      }
  options('--validate', null);
  options('--validate', '--stats');
  options(null, '--stats');
  options(null, null);  
  
}
MDLinks(comands['path'],(comands['stats']&&comands['validate']))
// module.exports = {isFile: isFile};
// module.exports = {isDir: isDir};
// module.exports = {searchDir: searchDir};

