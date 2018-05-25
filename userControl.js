var User = require('./models/user');
var Feed = require('./models/feed');
var mongoose = require('mongoose');
var getUser = function(_name){
  var module = {}
  module.addFeed = async function(feedName, type, url, callback){
    User.findOne({name : _name}, function(err, user){
      console.log(user);
      Feed.count({url : url}, function(err, count){
        if(err){
          callback(err);
        }else{
          if(count == 0){
            var newFeed = new Feed();
            newFeed.name = feedName;
            newFeed.type = type;
            newFeed.url = url;
            user.feeds.push(newFeed);
            newFeed.save(function(err){
              if(err){
                callback(err);
              }
            });
            user.save(function (err){
              if(!err){
                callback();
              }else{
                callback(err);
              }
            });
          }else{
            Feed.findOne({url : url}, function(err, feed){
              if(err){
                callback(err);
              }else{
                user.feeds.push(feed);
                user.save(function (err){
                  if(!err){
                    callback();
                  }else{
                    callback(err);
                  }
                });
              }
            });
          }
        }
      })
    });
  }
  module.exists = async function(callback){
    User.count({name : _name}, function(err, count){
      if(err){
        callback(err);
      }else{
        if(count == 1){
          callback(null, true);
        }else if(count == 0){
          callback(null, false);
        }else{
          callback('ERROR IN DATABASE: More than one user with name \'' + _name + '\' exists! Please fix duplicates.');
        }
      }
    });
  }
  return module;
}
module.exports = getUser;
