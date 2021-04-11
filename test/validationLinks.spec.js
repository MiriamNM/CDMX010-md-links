const validationLinks = require('./../functions');

describe('Obtener los links validados', () => {
  it('deberia ser una const', () => {
    expect(validationLinks).toBeDefined();
  });
  it('Deberia de ser un objeto', () => {
    expect(typeof validationLinks).toBe('object');
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
  })
});