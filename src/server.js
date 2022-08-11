//server.js
const express = require('express');
var path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));
app.use('src/assets', express.static(path.join(__dirname + 'src/assets/')));
app.use('src/animations', express.static(path.join(__dirname + 'src/animations/')));

app.set('port', process.env.PORT || 8080);

var server = app.listen(app.get('port'), function () {
  console.log('listening on port ', server.address().port);
});