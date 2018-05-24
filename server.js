var port = 8080;
var express = require('express');
var app = express();
var db = require('database.js');

db.connect();

app.get('/', function(req, res, next){
  res.status(200).send("It works!");
});

app.get('*', function(req, res, next){
  res.status(404).send("Page not found.");
})

app.listen(port, function(err){
  console.log('Server listening on port', port);
});
