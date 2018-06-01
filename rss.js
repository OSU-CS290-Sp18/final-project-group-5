function parse(url, callback)
{
    
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
                            "description": elem.description
                        }
                        feed.items.push(temp);
                    }
                }
            });
        }
        callback(feed);
    });
}

module.exports = parse;