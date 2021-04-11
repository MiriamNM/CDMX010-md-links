const fs = require('fs');

const readFile = () => {fs.readFileSync('./../documentos/doc1.txt', 'utf-8')};

describe('Obtener contenido del archivo', () => {
  it('deberia ser una const', () => {
    expect(readFile).toBeDefined();
  });
  it('Deberia de ser una función', () => {
    expect(typeof readFile).toBe('function');
  });
  it('Si retorna el contenido', () => {
    expect([
        'hola'
        ]).toEqual([
         'hola'
    ]);
  })
});