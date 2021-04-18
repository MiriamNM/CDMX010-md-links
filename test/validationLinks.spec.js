const mdLink = require('../mdLinksFunctions.js');
const helpers = require('./helpersTest.js');

describe('Obtener los links validados', () => {
  it('deberia ser una const', () => {
    expect(mdLink.validationLinks).toBeDefined();
  });
  it('Deberia de ser un función', () => {
    expect(typeof mdLink.validationLinks).toBe('function');
  });
  it('Si retorna los arreglos', () => {
    expect([{      
  path: 'C:\\Users\\hp\\Documents\\Laboratoria\\CDMX010-md-links',
  status: 200,
  statusText: 'OK',
  url: 'https://www.npmjs.com/'
},
{
  path: 'C:\\Users\\hp\\Documents\\Laboratoria\\CDMX010-md-links',
  status: 200,
  statusText: 'OK',
  url: 'https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback'
},
{
  path: 'C:\\Users\\hp\\Documents\\Laboratoria\\CDMX010-md-links',
  status: 200,
  statusText: 'OK',
  url: 'https://nodejs.org/docs/latest-v0.10.x/api/modules.html'
},
{
  path: 'C:\\Users\\hp\\Documents\\Laboratoria\\CDMX010-md-links',
  status: 200,
  statusText: 'OK',
  url: 'https://nodejs.org/api/path.html'
}]).toEqual([{      
    path: 'C:\\Users\\hp\\Documents\\Laboratoria\\CDMX010-md-links',
    status: 200,
    statusText: 'OK',
    url: 'https://www.npmjs.com/'
  },
  {
    path: 'C:\\Users\\hp\\Documents\\Laboratoria\\CDMX010-md-links',
    status: 200,
    statusText: 'OK',
    url: 'https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback'
  },
  {
    path: 'C:\\Users\\hp\\Documents\\Laboratoria\\CDMX010-md-links',
    status: 200,
    statusText: 'OK',
    url: 'https://nodejs.org/docs/latest-v0.10.x/api/modules.html'
  },
  {
    path: 'C:\\Users\\hp\\Documents\\Laboratoria\\CDMX010-md-links',
    status: 200,
    statusText: 'OK',
    url: 'https://nodejs.org/api/path.html'
  }]);
  });
  it('Validar la información de cada Link', () => {
    return (mdLink.validationLinks(helpers.links)).then(result => 
      expect(result).toStrictEqual(helpers.validateLinks));
  });
});