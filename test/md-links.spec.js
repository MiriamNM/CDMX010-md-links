const MDLinks = require('../md-links.js');
const helpers = require('./helpersTest.js');
const options = helpers.options1;
const path = helpers.path;
const options2 = helpers.options2;
const options3 = helpers.options3;
const options4 = helpers.options4;

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


describe('Obtener los links validados', () => {
    it('deberia ser una const', () => {
      expect(MDLinks).toBeDefined();
    });
    it('Deberia de ser un objeto', () => {
      expect(typeof MDLinks).toBe('function');
    });
    it('Si retorna los arreglos', () => {
      expect().toEqual();
    });
    it('Validar la información de cada Link', () => {
      return (MDLinks()).then(result => 
        expect(helpers.validateLinks).toStrictEqual(helpers.validateLinks));
    });
  //   it('Arroja sólo los links', () => {
//     return (MDLinks(path ,options1)).then(result => 
//       expect(result).toStrictEqual(helpers.validateLinks));
//   });
});

test('Arroja sólo los links', () => {
    return expect(MDLinks("C:\\Users\\hp\\Documents\\Laboratoria\\CDMX010-md-links\\documentos\\doc1.md",options2)).resolves.toStrictEqual(helpers.validateLinks);
});

describe('Obtener estadisitica de los links', () => {
    it('deberia ser una const', () => {
      expect(MDLinks).toBeDefined();
    });
    it('Deberia de ser un objeto', () => {
      expect(typeof MDLinks).toBe('function');
    });
    it('Si retorna los arreglos', () => {
      expect().toEqual();
    });
    it('Estadistica de los Links', () => {
      return (MDLinks()).then(result => 
        expect(helpers.statsLinks).toStrictEqual(helpers.statsLinks));
    });
  //   it('Arroja sólo los links', () => {
//     return (MDLinks(path ,options1)).then(result => 
//       expect(result).toStrictEqual(helpers.validateLinks));
//   });
});

test('Obtener estadistica y validación de los links', () => {
    return expect(MDLinks("C:\\Users\\hp\\Documents\\Laboratoria\\CDMX010-md-links\\documentos\\doc1.md",options3)).resolves.toStrictEqual(helpers.statsLinks);
});

describe('Obtener los links validados', () => {
    it('deberia ser una const', () => {
      expect(MDLinks).toBeDefined();
    });
    it('Deberia de ser un objeto', () => {
      expect(typeof MDLinks).toBe('function');
    });
    it('Si retorna los arreglos', () => {
      expect().toEqual();
    });
    it('Validar la información de cada Link', () => {
      return (MDLinks()).then(result => 
        expect(helpers.statsValidateLinks).toStrictEqual(helpers.statsValidateLinks));
    });
  //   it('Arroja sólo los links', () => {
//     return (MDLinks(path ,options1)).then(result => 
//       expect(result).toStrictEqual(helpers.validateLinks));
//   });
});

test('Estadistica y validación de los links', () => {
    return expect(MDLinks("C:\\Users\\hp\\Documents\\Laboratoria\\CDMX010-md-links\\documentos\\doc1.md",options4)).resolves.toStrictEqual(helpers.statsValidateLinks);
});
