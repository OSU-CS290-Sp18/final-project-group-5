module.exports = function (app) {
    var db = require("./database.js");

    app.get("/feed/:usersID/:pass", function (req, res, next) {
        db.getUser(req.params.userID).checkSecret(req.params.pass, function (err, result) {
            if (result) {
                res.render('feedpage', {
                    secret: true,
                    userID: req.params.userID
                })
            } 
        })
    })

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
