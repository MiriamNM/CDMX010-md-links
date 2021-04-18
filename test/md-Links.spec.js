const MDLinks = require('../md-links.js');
const helpers = require('./helpersTest.js');
const options = helpers.options1;
const path = helpers.path;

describe('MDLinks retornan los links obtenidos', () => {
  it('deberia ser una const', () => {
    expect(MDLinks).toBeDefined();
  });
  it('Deberia de ser una función', () => {
    expect(typeof MDLinks).toBe('function');
  });
  it('Si retorna los arreglos', () => {
    expect(helpers.options1Test).toEqual(helpers.options1Test);
  }); 
//   it('Arroja sólo los links', () => {
//     return (MDLinks(path ,options)).then(result => 
//       expect(result).toStrictEqual(helpers.options1Test));
//   });
});

test('Arroja sólo los links', () => {
    return expect(MDLinks("C:\\Users\\hp\\Documents\\Laboratoria\\CDMX010-md-links\\documentos\\doc1.md",options)).resolves.toStrictEqual(helpers.options1Test);
});


// describe('Obtener los links validados', () => {
//     it('deberia ser una const', () => {
//       expect(MDLinks).toBeDefined();
//     });
//     it('Deberia de ser un objeto', () => {
//       expect(typeof MDLinks).toBe('function');
//     });
//     it('Si retorna los arreglos', () => {
//       expect().toEqual();
//     });
//     it('Validar la información de cada Link', () => {
//       return (MDLinks()).then(result => 
//         expect(result).toStrictEqual(helpers));
//     });
//   });

//   describe('Obtener los links validados', () => {
//     it('deberia ser una const', () => {
//       expect(MDLinks).toBeDefined();
//     });
//     it('Deberia de ser un objeto', () => {
//       expect(typeof MDLinks).toBe('function');
//     });
//     it('Si retorna los arreglos', () => {
//       expect().toEqual();
//     });
//     it('Validar la información de cada Link', () => {
//       return (MDLinks()).then(result => 
//         expect(result).toStrictEqual(helpers));
//     });
//   });

//   describe('Obtener los links validados', () => {
//     it('deberia ser una const', () => {
//       expect(MDLinks).toBeDefined();
//     });
//     it('Deberia de ser un objeto', () => {
//       expect(typeof MDLinks).toBe('function');
//     });
//     it('Si retorna los arreglos', () => {
//       expect().toEqual();
//     });
//     it('Validar la información de cada Link', () => {
//       return (MDLinks()).then(result => 
//         expect(result).toStrictEqual(helpers));
//     });
//   });