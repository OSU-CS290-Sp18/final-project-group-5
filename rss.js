function parse(url, callback){
    
    var request = require('request');
    var xml2js = require('xml2js');
    var parser = xml2js.Parser();

    var xmlStr = "";

    request(url, function (error, response, body) {
        var feed = {};
        if (error) {
            console.log("URL Request Error: ", error);
            feed = null;
            
        } else if (response.statusCode >= 400 & response.statusCode < 600) {
            console.log("Invalid URL");
            feed = null;
        } else {
            parser.parseString(body, function (err, result) {
                if (err) {
                    console.log("XML Parse Error: ", err);
                    feed = null;
                } else {
                    feed.title = result.rss.channel[0].title;
                    feed.items = [];
                    for (var i = 0; i < result.rss.channel[0].item.length; i++) {
                        var elem = result.rss.channel[0].item[i];
                        var temp = {
                            "title": elem.title,
                            "link": elem.link,
                            "description": stripHtml(elem.description)
                        }
                        feed.items.push(temp);
                    }
                }
            });
        }
        callback(feed);
    });

	function stripHtml(inputText){
		//-- remove BR tags and replace them with line break
		returnText = String(inputText);
		returnText= returnText.replace(/<br>/gi, "\n");
		returnText= returnText.replace(/<br\s\/>/gi, "\n");
		returnText=returnText.replace(/<br\/>/gi, "\n");
		
		//-- remove URLs within string
		returnText=returnText.replace(/\(http.*\)/, "");

		//-- remove P and A tags but preserve what's inside of them
		returnText=returnText.replace(/<p.*>/gi, "\n");
		returnText=returnText.replace(/<a.*href="(.*?)".*>(.*?)<\/a>/gi, " $2 ($1)");

		//-- remove all inside SCRIPT and STYLE tags
		returnText=returnText.replace(/<script.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/script>/gi, "");
		returnText=returnText.replace(/<style.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/style>/gi, "");

		//-- remove all else
		returnText=returnText.replace(/<(?:.|\s)*?>/g, "");

		//-- get rid of more than 2 multiple line breaks:
		returnText=returnText.replace(/(?:(?:\r\n|\r|\n)\s*){2,}/gim, "\n\n");

		//-- get rid of more than 2 spaces:
		returnText = returnText.replace(/ +(?= )/g,'');

		//-- get rid of html-encoded characters:
		returnText=returnText.replace(/&nbsp;/gi," ");
		returnText=returnText.replace(/&amp;/gi,"&");
		returnText=returnText.replace(/&quot;/gi,'"');
		returnText=returnText.replace(/&lt;/gi,'<');
		returnText=returnText.replace(/&gt;/gi,'>');

		return returnText;
	};

}

module.exports = parse;
