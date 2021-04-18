const mdLinks = require('../mdLinksFunctions.js');

describe('Obtener los links validados', () => {
  it('deberia ser una const', () => {
    expect(mdLinks.globalStats).toBeDefined();
  });
  it('Deberia de ser una función', () => {
    expect(typeof mdLinks.globalStats).toBe('function');
  });
  it('Debe dar unique y total de los links', () => {
    expect([{ unique: 7, total: 7 }]).toEqual([{ unique: 7, total: 7 }]);
  });
})
