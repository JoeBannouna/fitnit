var http = require('http');
var fs = require('fs');
var path = require('path');
var hostname = '0.0.0.0';
var port = 3000;
var server = http.createServer(function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Content-Type', 'text/html');
    // fs.readFile(path.join('dist', 'index.html'))
    res.statusCode = 200;
    res.end('yes');
});
server.listen(port, hostname, function () {
    console.log("Server running at http://".concat(hostname, ":").concat(port, "/"));
});
