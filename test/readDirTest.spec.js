const filesDir = require('./../mdLinksFunctions.js');
const fs = require('fs');

//const filesDir= () => {fs.filesDirSync('./../documentos', 'utf-8')};

describe('Obtener contenido del directorio', () => {
  it('deberia ser una const', () => {
    expect(filesDir).toBeDefined();
  });
  it('Deberia de ser un objeto', () => {
    expect(typeof filesDir).toBe('object');
  });
  it('Si retorna el contenido', () => {
    expect([
        'doc1.md', 'doc1.txt', 'doc2.md', 'doc2.txt' 
        ]).toEqual([
        'doc1.md', 'doc1.txt', 'doc2.md', 'doc2.txt'
    ]);
  })
});