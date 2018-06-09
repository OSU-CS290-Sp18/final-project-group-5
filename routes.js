module.exports = function(app){
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
	app.get('*', function(req, res, next){
	  res.status(404).send("Page not found.");
	})
}
