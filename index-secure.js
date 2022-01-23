var fs = require('fs');

var https = require('https');
var privateKey  = fs.readFileSync('sslcert/privatekey.key', 'utf8');
var certificate = fs.readFileSync('sslcert/certificate.crt', 'utf8');

var credentials = {key: privateKey, cert: certificate};

const express = require('express');
const app = express();

// Static folder
app.use(express.static(__dirname + '/frontend/dist'));

app.post('/api/loggedin', (req, res) => {
  res.send('indeed');
})

var httpsServer = https.createServer(credentials, app);
httpsServer.listen(8080, '0.0.0.0', () => console.log('server running'));
// const server = app.listen(8080, '0.0.0.0');
