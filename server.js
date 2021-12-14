const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '0.0.0.0';
const port = 3000;

const server = http.createServer((req, res) => {
  fs.readFile(path.join('dist', 'index.html'))
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end();
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});