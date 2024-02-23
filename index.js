const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

// Static folder
app.use(express.static(__dirname + '/frontend/dist'));

app.post('/api/loggedin', (req, res) => {
  res.send('indeed');
});

app.use(function (req, res, next) {
  res.status(404);
  fs.readFile(path.join('frontend', 'dist', 'index.html'), 'utf8', (err, data) => {
    res.send(data);
  });
});

const server = app.listen(8080, '0.0.0.0');
