const http = require('http');
const colors = require('colors');

const handleServer= ((req, res) => {
    res.writeHead(200, {'Content.type':'text/HTML'});
    res.write('<p>Hola mundo</p>');
    res.end();
});

const server = http.createServer(handleServer);

server.listen(3000, () => {
    console.log('servidor en puerto 3000'.bgCyan);
});