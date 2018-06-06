var port = 8080;
var express = require('express');
var app = express();
var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
var db = require('./database.js');

db.connect(function(err){
  if(!err){
    app.use(express.static('public/css'));
    app.use(express.static('.')); //maybe we should specify a public/js folder because we probably don't want to host all files in the root directory
    app.use(express.static('public/html'));
    require("./routes")(app);

    app.listen(port, function(err){
      console.log('Server listening on port', port);
    });
  }else{
    console.log("Error connecting to database!");
  }
});
