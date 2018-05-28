function parse(url)
{
    var request = require('request');
    var xml2js = require('xml2js');
    var parser = xml2js.Parser();

    var xmlStr = "";
    request('url', function (error, response, body) {
        if (error) {
            console.log("URL Request Error: ", error);
            return null;
            
        } else if (response.statusCode >= 400 & response.statusCode < 600) {
            console.log("Invalid URL");
            return null;
        } else {
            xmlStr = body;
        }
    });

    var xmlObj;
    parser.parseString(xmlStr, function (error, result) {
        if (err) {
            xmlObj = null;
            console.log("XML Parse Error: ");
        } else {
            xmlObj = result;
        }
    });

    var feed = {};
    feed.title = xmlObj.rss.channel[0].title;
    feed.items = xmlObj.rss.channel[0].item;

    return feed;
}

module.exports = parse;