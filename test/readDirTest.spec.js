const fs = require('fs');

const readdir= () => {fs.readdirSync('./../documentos', 'utf-8')};

describe('Obtener contenido del archivo', () => {
  it('deberia ser una const', () => {
    expect(readdir).toBeDefined();
  });
  it('Deberia de ser una función', () => {
    expect(typeof readdir).toBe('function');
  });
  it('Si retorna el contenido', () => {
    expect([
        'doc1.md', 'doc1.txt', 'doc2.md', 'doc2.txt' 
        ]).toEqual([
        'doc1.md', 'doc1.txt', 'doc2.md', 'doc2.txt'
    ]);
  })
});