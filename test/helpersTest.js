const links = [
    'https://www.npmjs.com/))',
    'https://nodejs.org/docs/latest-v0.10.x/api/modules.html)',
    'https://docs..npmjs.com/files/package.json)',
    'https://docs.npmjs.com/misc/scripts)',
    'https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback)',
    'https://nodejs.org/api/path.html)',
    'https://medium.com/netscape/a-guide-to-create-a--nodejs-command-line-package-c2166ad0452e)'
  ]

const validateLinks = [
    {
      path: "C:\\Users\\hp\\Documents\\Laboratoria\\CDMX010-md-links\\mdLinksFunctions.js",
      status: 200,
      statusText: 'OK',
      url: 'https://www.npmjs.com/'
    },
    {
      path: "C:\\Users\\hp\\Documents\\Laboratoria\\CDMX010-md-links\\mdLinksFunctions.js",
      status: 200,
      statusText: 'OK',
      url: 'https://nodejs.org/docs/latest-v0.10.x/api/modules.html'
    },
    {
      path: "C:\\Users\\hp\\Documents\\Laboratoria\\CDMX010-md-links\\mdLinksFunctions.js",
      status: 500,
      statusText: 'FAIL',
      url: 'https://docs..npmjs.com/files/package.json'
    },
    {
      path: "C:\\Users\\hp\\Documents\\Laboratoria\\CDMX010-md-links\\mdLinksFunctions.js",
      status: 200,
      statusText: 'OK',
      url: 'https://docs.npmjs.com/misc/scripts'
    },
    {
      path: "C:\\Users\\hp\\Documents\\Laboratoria\\CDMX010-md-links\\mdLinksFunctions.js",
      status: 200,
      statusText: 'OK',
      url: 'https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback'
    },
    {
      path: "C:\\Users\\hp\\Documents\\Laboratoria\\CDMX010-md-links\\mdLinksFunctions.js",
      status: 200,
      statusText: 'OK',
      url: 'https://nodejs.org/api/path.html'
    },
    {
      path: "C:\\Users\\hp\\Documents\\Laboratoria\\CDMX010-md-links\\mdLinksFunctions.js",
      status: 200,
      statusText: 'OK',
      url: 'https://medium.com/netscape/a-guide-to-create-a--nodejs-command-line-package-c2166ad0452e'
    }
  ]

const globStats = { unique: 7, total: 7 }

let options1 = { validate: false, stats: false }

let options2 = { validate: true, stats: false }

let options3 = { validate: false, stats: true }

let options4 = { validate: true, stats: true }

const path = "C:\\Users\\hp\\Documents\\Laboratoria\\CDMX010-md-links\\documentos\\doc1.md";

const options1Test = [
    'https://www.npmjs.com/))',
    'https://nodejs.org/docs/latest-v0.10.x/api/modules.html)',
    'https://docs..npmjs.com/files/package.json)',
    'https://docs.npmjs.com/misc/scripts)',
    'https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback)',
    'https://nodejs.org/api/path.html)',
    'https://medium.com/netscape/a-guide-to-create-a--nodejs-command-line-package-c2166ad0452e)'
  ]

module.exports = {
    links,
    validateLinks,
    globStats,
    options1,
    options2,
    options3,
    options4,
    options1Test,
    path,
}