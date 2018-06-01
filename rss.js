function parse(url, callback)
{
    
    var request = require('request');
    var xml2js = require('xml2js');
    var parser = xml2js.Parser();

    var xmlStr = "";

    request(url, function (error, response, body) {
        if (error) {
            console.log("URL Request Error: ", error);
            return null;
            
        } else if (response.statusCode >= 400 & response.statusCode < 600) {
            console.log("Invalid URL");
            return null;
        } else {
            parser.parseString(body, function (err, result) {
                if (err) {
                    console.log("XML Parse Error: ", err);
                    return null;
                } else {
                    var feed = {};
                    feed.title = result.rss.channel[0].title;
                    feed.items = result.rss.channel[0].item;
                    return feed;
                }
            });
        }
    });
    

    callback();
}

module.exports = parse;