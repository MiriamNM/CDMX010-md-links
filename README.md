# Markdown Links

[Markdown] (https://es.wikipedia.org/wiki/Markdown) is a markup language
lightweight very popular with developers. It is used in many platforms that
handle plain text (GitHub, forums, blogs, ...), and it is very common
find multiple files in that format in any type of repository
(starting with the traditional `README.md`).

## Process

* Flowchart
![Flowchart](https://github.com/MiriamNM/CDMX010-md-links/blob/master/assets/Diagrama%20md-Links.png)

## files

* `README.md`.
* `index.js`: From this file you must export a function (`mdLinks`).
* `package.json`.
* `.editorconfig`.
* `.eslintrc`.
* `.gitignore`.
* `test/md-links.spec.js`.
  `mdLinks()`.

## Install

```npm
npm install -g md-links1
```

* You must put in your console `npm i md-links1`, to download the extension.
* First, in the console you must put: node md-Links (followed by the file path.)
! [Commands] (https://github.com/MiriamNM/CDMX010-md-links/blob/master/assets/inicio.png)
* Later you must put:
-v or --validate: To show you if the Links is broken or if it works.
! [Validation of Links] (https://github.com/MiriamNM/CDMX010-md-links/blob/master/assets/v.png)
-s or --stats: To show you a statistic of how many are unique and the total number of links obtained.
! [Link Statistics] (https://github.com/MiriamNM/CDMX010-md-links/blob/master/assets/s.png)
-v -s or --validate --stats: To show you the status of the links and a statistic of how many broken, unique and the total number of links.
! [Validation and statistics of Links] (https://github.com/MiriamNM/CDMX010-md-links/blob/master/assets/v%20s.png)
If you only put the file path, it shows you only the links.
! [Links] (https://github.com/MiriamNM/CDMX010-md-links/blob/master/assets/path.png)

# Usage

```bash
md-links1
```

# Contributing

If someone wants to add or improve something, I invite you to collaborate directly in this repository: [md-links1](https://github.com/MiriamNM/CDMX010-md-links).

# License

random-msg is released under the [MIT License](https://opensource.org/licenses/MIT).

# Keywords

Javascript Node.js npm