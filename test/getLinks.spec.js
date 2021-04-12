const getLinks = require('./../mdLinks.js');

describe('Obtener los links', () => {
  it('deberia ser una const', () => {
    expect(getLinks).toBeDefined();
  });
  it('Deberia de ser un objeto', () => {
    expect(typeof getLinks).toBe('object');
  });
  it('Si retorna los links', () => {
    expect([
      'https://www.npmjs.com/))',
      'https://nodejs.org/docs/latest-v0.10.x/api/modules.html)',
      'https://docs.npmjs.com/files/package.json)',
      'https://docs.npmjs.com/misc/scripts)',
      'https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback)',
      'https://nodejs.org/api/path.html)',
      'https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e)'
    ]).toEqual([
      'https://www.npmjs.com/))',
      'https://nodejs.org/docs/latest-v0.10.x/api/modules.html)',
      'https://docs.npmjs.com/files/package.json)',
      'https://docs.npmjs.com/misc/scripts)',
      'https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback)',
      'https://nodejs.org/api/path.html)',
      'https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e)'
    ]);
  })
});
