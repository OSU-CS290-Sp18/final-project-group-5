module.exports = function (app) {
    var db = require("./database.js");

    app.get("/feeds/:usersID/:pass", function (req, res, next) {
        db.getUser(req.params.usersID).checkSecret(req.params.pass, function (err, result) {
            if (result) {
                res.render('feedpage', {
                    secret: true,
                    userID: req.params.usersID
                })
            } else {
                res.redirect("/feeds/" + req.params.usersID);
            }
        })
    })

	app.get('/feeds/:userID', function(req, res, next){
    console.log(req.params.userID);
		res.render('feedpage', {
			userID: req.params.userID
		});
	});
  app.get('/', function(req, res, next){
		var db = require('./database.js');
		var users = [];
		db.getAllUserNames(function(usernames){
			console.log(usernames);
			for(let i = 0; i < usernames.length; i++){
				db.getUser(usernames[i]).getFeedCount(function(err, num){
					console.log(num);
					var newUser = {
						username : usernames[i],
						feedCount : num
					}
					users.push(newUser);
					if(users.length == usernames.length){
						console.log(users);
						res.render('index', {
							users : users
						});
					}
				});
			}
		});
	});
  app.post('/addUser', function(req, res, next){
    db.createUser(req.body.username, function(err){
      if(!err){
        db.getUser(req.body.username).setSecret(req.body.secret, function(err){
          if(!err){
            res.status(200).end();
          }else{
            res.status(400).end();
          }
        });
      }else{
        res.status(400).end();
      }
    });
  });
	app.get('*', function(req, res, next){
	  res.status(404).send("Page not found.");
	})
}
