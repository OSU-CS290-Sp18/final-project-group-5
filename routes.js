module.exports = function(app, db1){

	var db = require('./database.js');
	app.get('/feeds/:userID/:pass?', function(req, res, next){
		db.getUser(req.params.userID).exists(function(err, value){
			if(!err){
				if(value){
					db.getUser(req.params.userID).getFeeds(function(err, feeds){
						if(!err){
							console.log(feeds);
							var context;
							if(feeds.length == 0){
								if(req.params.pass){
									db.getUser(req.params.userID).checkSecret(req.params.pass, function (err, result) {
										var context = {
											"userID": "Get some feeds, " + req.params.userID + "!",
											"secret": result,
											"feed": []
										}
										res.status(200).render('feedpage', context);
									});
								}else{
									res.status(200).render('feedpage', {
										"userID" : req.params.userID + " has no feeds!"
									});
								}
							}
							else if(req.params.pass){
								console.log("have pass");
								console.log("PW: " + req.params.pass);
								db.getUser(req.params.userID).checkSecret(req.params.pass, function (err, result) {
									console.log("in check secret callback");
									console.log("result: " + result);
									if (result){
										console.log("have correct pass");

										require('./generateContext')(req.params.userID, true, feeds, function(context){
											res.status(200).render('feedpage', context);
											});
									}
									else{
										console.log("have incorrect pass");
										require('./generateContext')(req.params.userID, false, feeds, function(context){
											res.status(200).render('feedpage', context);
											});
									}
								});
							}
							else{
										require('./generateContext')(req.params.userID, false, feeds, function(context){
											res.status(200).render('feedpage', context);
											});

							}
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
	app.post("/feeds/:userID/:pass/addFeed", function (req, res, next) {

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
