const express = require('express');
const app = express();

// Static folder
app.use(express.static(__dirname + '/frontend/dist'));

app.post('/api/loggedin', (req, res) => {
  res.send('indeed');
})

const server = app.listen(8080, '0.0.0.0');
