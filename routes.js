module.exports = function(app){
	app.get('/feeds/:userID', function(req, res, next){
		console.log(req.params.userID);
		res.render('feedpage', {
			userID: req.params.userID
		});
	});

	app.get('*', function(req, res, next){
	  res.status(404).send("Page not found.");
	})
}
