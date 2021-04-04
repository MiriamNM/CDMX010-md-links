const colors = require('colors');
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch')

const pathDir = 'C:/Users/hp/Documents/Laboratoria/CDMX010-md-links/documentos';
// const linksCuts = [];
// const linksFine = [];
// Ruta
const way = (file) => {
const join = pathDir;
const joinFile = file;
console.log(`link: ${path.join(join, joinFile)}`.bgGreen);
}


// Verificar si es carpeta.
const isMdOrNot = (file) => {
  const expression = /^(.+)\/([^\/]+)$/m;
  const result = file.match(expression);
  console.log(result)
} 

// Obtener los links.
const getLinks = (data) => {
const resultado = data.match(/\(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}\gi/gm);
console.log(resultado);
validationLinks(data);
}

//Validar links.
const validationLinks = (data) => {
  data.forEach(link => {
    let promesa = fetch(link);
    promesa.then((res) => {
      return res.json();
    })
    .then((json) => {
      console.log(json);
    })
  })
}


//leer archivo.
const readFiles = (file) => {
  fs.readFile(`${path.join(pathDir, file)}`, 'utf8', (err, data) => {
  try {
    console.log(data.zebra.magenta);
    // obtener links de cada archivo.
    getLinks(data);
  } catch {
    console.log(err);
  };  
});
}


// Lectura de archivo de carpetas.
const filesDir = () => {
	fs.readdir(pathDir, (err, data) => {
		if (err) {
			return console.log(('Error al procesar el archivo'.rainbow));
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
