const colors = require('colors');
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const process = require('process');
const { rejects } = require('assert');
const { resolve } = require('path');
const { error } = require('console');

// FUNCIÓN DE CLI, NO DEBE IR AQUÍ PERO AUN NO SE MODULAR BIEN.
const cliCommand = process.argv;
const comands = {
  node: cliCommand[0],
  mdLinks: cliCommand[1],
  path: cliCommand[2],
  validate: cliCommand[3],
  stats: cliCommand[4],
}

let option ='';
if (comands['validate'] == undefined || comands['validate'] == null) {
  option = comands.replace(3,1,'stats')
} else if (comands['stats'] == undefined || comands['stats'] == null){  
  option = comands.replace(4,1,'validate')
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
 return Promise.all(links);
} 

// Estadistica de los links.
const statsStadistics = (arrayMd) => {
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
  
  console.log(result);
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
  console.log(arrayMd,'vaquita');
  return (arrayMd)
}

// FUNCIÓN DE MDLINKS, NO DEBE IR AQUÍ PERO AUN NO SE MODULAR BIEN.
const MDLinks = (filePath, option) => {
  return new Promise((resolve, rejects) => {
    const arrayMd = getMds(filePath);
    arrayMd.forEach((fileMd) => {
      const archiveContent = readFile(fileMd);
      console.log(archiveContent,'patito')
      const theLinks = getLinks(archiveContent);
      console.log(theLinks,'caracolitos')
      if (comands['validate'] === null || comands['validate'] === undefined) {
        resolve(theLinks);
      } else {
        resolve(validationLinks(theLinks));
      }
      if (comands['path'] === false) {
      rejects(console.log(error, '>>>>>>>>>'));//Si path esta mal
      }
    })
  })   
}


MDLinks(comands['path'])
  .then((res) => {
   /* if (comands['stats'] === null || comands['stats'] === undefined) {
      return Promise.all(console.log(getLinks(res)), 'De stats');
    } else {
      return Promise.all(statsStadistics(res));
    }*/
    console.log('primera respuesta <<<<<', res)
  })
  .then((res) => {console.log(res, 'patito feliz')})
  .catch((err) => {console.log(err, '<<<<<<<')});  
MDLinks(comands['path'], option)