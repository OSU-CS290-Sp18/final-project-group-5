var port = 8080;
var express = require('express');
var app = express();
var db = require('database.js');

db.connect(function(err){
  if(!err){
    console.log('Succesfully connected to database');
  }else{
    console.log('ERROR CONNECTING TO DATABASE: ', err);
  }
});

app.get('/', function(req, res, next){
  res.status(200).send("It works!");
});

app.get('*', function(req, res, next){
  res.status(404).send("Page not found.");
})

app.listen(port, function(err){
  console.log('Server listening on port', port);
});
