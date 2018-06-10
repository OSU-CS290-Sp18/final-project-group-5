module.exports = function(id, secretVal, feeds, callback){
	var feedArr = [];
	var rssParser = require("./rss");

	getAllPages(feeds, function(feedArr){
		var context = {
		"userID": id,
		"secret": secretVal,
		"feed": feedArr
		}
		if(feedArr.length == (feeds.length * 3)){
			callback(context);

		}
	});


	function getAllPages(feeds, callback){
		var arr = [];
		for (var i = 0; i < feeds.length; i++){
			rssParser(feeds[i].url, function(page){
				var three_articles = getNArticles(page, 3);
				arr = arr.concat(three_articles);
				callback(arr);
				});
			}
			
	}

	function getNArticles(page, n){
		var n_articles = [];
		for (var i = 0; i < n; i++){
			var single_article = {
				"title": page.items[i].title,
				"url": page.items[i].link,
				"content": page.items[i].description
			}	
			n_articles.push(single_article);
		}
		return n_articles;
	}

}
