const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '0.0.0.0';
const port = 3000;

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader('Content-Type', 'text/html');
  // fs.readFile(path.join('dist', 'index.html'))
  res.statusCode = 200;
  res.end('yes');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
