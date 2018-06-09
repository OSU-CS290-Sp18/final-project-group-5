module.exports = function(app, db){


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
        })
    })
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
	app.get('*', function(req, res, next){
	  res.status(404).send("Page not found.");
	})
}
