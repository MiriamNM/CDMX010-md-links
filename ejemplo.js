const fs = require('fs');
const { get } = require('http');
const fetch = require('node-fetch');

const filesWithRead = fs.readFileSync('./documentos/doc1.md', 'utf8');
const resultado = filesWithRead.match(/\bhttps?:\/\/\S+/gi);
let linksTotal = [];
let linksBad = [];
let result = {}


resultado.forEach((link) => {
    linksTotal.push(link);
    fetch(linksTotal,get)
    .then((res) => {
        if(res.status !== 200) {
        linksBad.push(link);
        } 
    })
    .catch(
        (error) => console.log(error)
    );
    
    
    result = {
        Broken: linksBad.length,
        Unique: [...new Set(linksTotal)].length,
        total: linksTotal.length,
        }
    console.log(result, 'wiiiiii');
    console.log(resultado, 'si toy');
    return resultado    
  
});
 