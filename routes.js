module.exports = function(app, db1){

	var db = require('./database.js');
	app.get('/feeds/:userID', function(req, res, next){
		db.getUser(req.params.userID).exists(function(err, value){
			if(!err){
				if(value){
					db.getUser(req.params.userID).getFeeds(function(err, feeds){
						if(!err){
							var context;
							require('./generateContext')(req.params.userID, feeds, function(context){
								res.status(200).render('feedpage', context);
								});
							}
						else{
							res.status(404).send("Feeds for user not found");
						}
					});
				}
			}
			else{
				res.status(404).send("User not found, make new page.");
			}
		});
	});
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
        });
    });

	app.get('/feeds/:userID', function(req, res, next){
    console.log(req.params.userID);
		res.render('feedpage', {
			userID: req.params.userID
		});
	});

	app.post("/feeds/:userID/:pass/addFeed", function (req, res, next) {
	    console.log(req.body);
	    db.getUser(req.params.userID).checkSecret(req.params.pass, function (err, result) {
	        if (result) {
	            var rss = require("./rss.js");
	            rss(req.body.feedURL, function (feed) {
	                if (!feed) {
	                    res.status("400").send("Invalid URL");
	                } else {
	                    db.getUser(req.params.userID).addFeed(feed.title, null, req.body.feedURL, function (err) {
	                        if (err) {
	                            res.status("500").send("Error adding feed to database");
	                        } else {
	                            res.status("200").send();
	                        }
	                    });
	                }
	            });
	        } else {
	            res.status("400").send("Invalid Password");
	            console.log(result);
	        }
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
    if(db.isValidUsername(req.body.username.toLowerCase()) == true){
      db.createUser(req.body.username.toLowerCase(), function(err){
        if(!err){
          db.getUser(req.body.username.toLowerCase()).setSecret(req.body.secret, function(err){
            if(!err){
              res.status(200).end();
            }else{
              res.status(500).end();
            }
          });
        }else{
          res.status(500).end();
        }
      });
    }else{
      res.status(400).end();
    }
  });

	app.get('*', function(req, res, next){
	  res.status(404).send("Page not found.");
	})
}
