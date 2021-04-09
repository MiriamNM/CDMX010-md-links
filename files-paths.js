const colors = require('colors');
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const { get } = require('http');
const { url } = require('inspector');
const { Console, error } = require('console');
const { resolveAny } = require('dns');
const { rejects } = require('assert');
const { resolve } = require('path');

const pathDir = 'C:/Users/hp/Documents/Laboratoria/CDMX010-md-links/documentos';

// Ruta
const way = (file) => {
const join = pathDir;
const joinFile = file;
console.log(`link: ${path.join(join, joinFile)}`.bgGreen);
}


// Verificar si es carpeta.
const isMdOrNot = (path) => {
  const expression = /^(.+)\/([^\/]+)$/m;
  const result = file.match(expression);
  //console.log(result)
} 

// Obtener los links.
const getLinks = (data) => {
  return new Promise((resolve, rejects) => {
  const resultado = data.match(/\(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}\gi/gm);
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
      const newLinks = link.slice(1,40);
      //console.log(newLinks);
      linksFetch(newLinks);
  });
return resultado
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
  const datafile = fs.readFileSync(`${path.join(pathDir, file)}`, 'utf8')
  getLinks(datafile)
    .then((arrayLinks) => {
      console.log(arrayLinks, 'perritos');
      const stats = statsStadistics(arrayLinks);
      return Promise.all(stats);
    }).then((res)=> {
      console.log(res, 'gatitos')
    })
    .catch((err) => console.log(err, 'error de promesa'));  
}


// Lectura de archivo de carpetas.
const filesDir = () => {
	fs.readdir(pathDir, (err, data) => {
		if (err) {
			return console.log(('Error al procesar el archivo'));
		}	else {
		  data.forEach((file) => {
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
	});
}

return filesDir();
