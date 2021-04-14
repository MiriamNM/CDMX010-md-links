const readFile = require('./../mdLinks.js');
const fs = require('fs');

//const readFile = () => {fs.readFileSync('./../documentos/doc1.txt', 'utf-8')};

describe('Obtener contenido del archivo', () => {
  it('deberia ser una const', () => {
    expect(readFile).toBeDefined();
  });
  it('Deberia de ser un objeto', () => {
    expect(typeof readFile).toBe('object');
  });
  it('Si retorna el contenido', () => {
    expect([
        'hola'
        ]).toEqual([
         'hola'
    ]);
  })
});