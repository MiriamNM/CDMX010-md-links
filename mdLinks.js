const colors = require('colors');
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const process = require('process');
// FUNCIÓN DE CLI, NO DEBE IR AQUÍ PERO AUN NO SE MODULAR BIEN.
const dir = process.argv[2];
const findOption = (defaultOption, shortOption) => process.argv.findIndex((option) => option == shortOption || option == defaultOption);
const statsOptionIndex = findOption('--stats', '-s')
const validateOptionIndex = findOption('--validate', '-v')
// const comands = {
//   node: cliCommand[0],
//   mdLinks: cliCommand[1],
//   path: cliCommand[2],
//   validate: cliCommand[3],
//   stats: cliCommand[4],
// }
const options = {
  validate: validateOptionIndex > 0,
  stats: statsOptionIndex > 0,
};
console.log({ options })
// if (comands['validate'] === '--validate' || comands['validate'] === '--v' || comands['stats'] === '--validate' || comands['stats'] === '--v') {
//   options.validate=true;
// } 
// if (comands['validate'] === '--stats' || comands['validate'] === '--s' || comands['stats'] === '--stats' || comands['stats'] === '--s') {
//   options.validate=true;
// }
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
  const promises = links.map((link) => { // [Promise, Promise, Promise]
    const linkMap = link.replace(/[{()}]/g, '');
    return fetch(linkMap)
      .then((res) => {
        const link = { 
          path: path.resolve(linkMap),
          status: res.status,
          statusText: res.ok ? 'OK' : 'FAIL', 
          url: linkMap 
        }
        //console.log(link)
        return link
      })
      .catch(() => {
          const link = { 
            path: path.resolve(linkMap),
            status: 500,
            statusText: 'FAIL', 
            url: linkMap 
          }
          //console.log(link)
          return link
        }
      )
  });
  return Promise.all(promises);
} 
const getBrokenLinks = (links) => {
  return links.filter(link => link.statusText == 'FAIL')
}
// Estadistica de los links.
const brokenStats = (links) => {
  const brokenLinks =  getBrokenLinks(links);
  return brokenLinks.length;
}
// Estadistica de los links.
const globalStats = (links) => {
  //console.log(objectArray, 'reeeeesp');
  const result = {
    unique: [...new Set(links)].length,
    total: links.length,
  }
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
  return (arrayMd)
}
// FUNCIÓN DE MDLINKS, NO DEBE IR AQUÍ PERO AUN NO SE MODULAR BIEN.
const MDLinks = (filePath, options) => {
  let links = []
  const files = getMds(filePath);
  files.forEach((file) => {
      const content = readFile(file);
      const newLinks = getLinks(content);
      links = links.concat(newLinks)      
  })
  if (options.validate && options.stats) {
    return validationLinks(links)
      .then(res => {
        console.log(res);
        const stats = globalStats(links)
        stats.broken = brokenStats(res)
        console.log(stats)
      })
  }
  if (options.validate) {
    return validationLinks(links).then(res => console.log(res))
  }
  if (options.stats) {
    const stats = globalStats(links)
    console.log(stats)
  }
  console.log(links)
  return links;
}
MDLinks(dir, options)