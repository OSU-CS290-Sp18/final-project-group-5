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
	
	app.get('*', function(req, res, next){
	  res.status(404).send("Page not found.");
	})
}
