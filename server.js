var port = 8080;
var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var path = require('path');
var bodyParser = require('body-parser');

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
var db = require('./database.js');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

db.connect(function(err){
  if(!err){

    require("./routes")(app);

    app.listen(port, function(err){
      console.log('Server listening on port', port);
    });
  }else{
    console.log("Error connecting to database!");
  }
});
