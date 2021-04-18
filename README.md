# Markdown Links

## Índice

* [1. Preámbulo](#1-preámbulo)
* [2. Desarrollo del proyecto](#2-desarroll-del-proyecto)
* [3. Procesoe](#3-proceso)
* [4. Consideraciones generales](#4-consideraciones-generales)
* [5. Archivos del proyecto](#5-archivos-del-proyecto)
* [6. Instrucciónes de uso](#6-instrucciones-de-uso)
***

## 1. Preámbulo

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero muy popular entre developers. Es usado en muchísimas plataformas que
manejan texto plano (GitHub, foros, blogs, ...), y es muy común
encontrar varios archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

Dentro de una comunidad de código abierto, nos han propuesto crear una
herramienta usando [Node.js](https://nodejs.org/), que lea y analice archivos
en formato `Markdown`, para verificar los links que contengan y reportar
algunas estadísticas.

![md-links](https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg)

## 2. Desarrollo del proyecto

En este proyecto se utilizaron tecnologias como Node.js, JS, gitHub proyect y una pagina para realizar el diagrama de flujo que me guió para el desarroyo del trabajo. 

## 3. Proceso

*Para el desarrollo del proyecto, promero se realizo un diagrama de flujo.
![diagrama mDLinks](https://github.com/MiriamNM/CDMX010-md-links/blob/master/assets/Diagrama%20md-Links.png)

*Posteriosmente se paso al estudio de node.js para saber que metodos se usaría en el proyecto.

Finalmente se comenzo a programar hasta obtener finalmente la extensión mDLinks. 

## 5. Archivos del proyecto

* `README.md` con descripción del módulo, instrucciones de instalación/uso,
  documentación del API y ejemplos. Todo lo relevante para que cualquier
  developer que quiera usar tu librería pueda hacerlo sin inconvenientes.
* `index.js`: Desde este archivo debes exportar una función (`mdLinks`).
* `package.json` con nombre, versión, descripción, autores, licencia,
  dependencias, scripts (pretest, test, ...)
* `.editorconfig` con configuración para editores de texto. Este archivo no se
  debe cambiar.
* `.eslintrc` con configuración para linter. Este archivo no
  se debe cambiar.
* `.gitignore` para ignorar `node_modules` u otras carpetas que no deban
  incluirse en control de versiones (`git`).
* `test/md-links.spec.js` debe contener los tests unitarios para la función
  `mdLinks()`. Tu inplementación debe pasar estos tets.

## 6. Instrucciónes de uso

* Debes de poner en tu consola `npm install <github-user>/md-links`, para descargar la extensión.
* Primero, en la consola debes de colocar: node md-Links (seguido de la ruta del archivo.)
![Comandos](https://github.com/MiriamNM/CDMX010-md-links/blob/master/assets/inicio.png)
* Posteriormente debes de poner :
-v o --validate: Para que te muestre si el Links esta roto o si sirve.
![Validacion de Links](https://github.com/MiriamNM/CDMX010-md-links/blob/master/assets/v.png)
-s o --stats: Para que te muestre una estadistica de cuantos son unicos y el total de links obtenidos.
![Estadistica de Links](https://github.com/MiriamNM/CDMX010-md-links/blob/master/assets/s.png)
-v -s o --validate --stats: Para que te muestre el estado de los links y una estadistica de cuantos rotos, unicos y el número tota de links. 
![Validacion y estadistica de Links](https://github.com/MiriamNM/CDMX010-md-links/blob/master/assets/v%20s.png)
Si solo pones la ruta del archivo, te muestra solo los links.
![Links](https://github.com/MiriamNM/CDMX010-md-links/blob/master/assets/path.png)